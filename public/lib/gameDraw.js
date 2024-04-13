
import { settings } from "./settings.js";
import { gui } from "./socketInit.js";

var gameDraw = {
    color: null,
    /** https://gist.github.com/jedfoster/7939513 **/
    decimal2hex: (d) => {
        return d.toString(16);
    }, // convert a decimal value to hex
    hex2decimal: (h) => {
        return parseInt(h, 16);
    }, // convert a hex value to decimal
    mixColors: (color_2, color_1, weight = 0.5) => {
        if (weight === 1) return color_1;
        if (weight === 0) return color_2;
        var col = "#";
        for (var i = 1; i <= 6; i += 2) {
            // loop through each of the 3 hex pairs—red, green, and blue, skip the '#'
            var v1 = gameDraw.hex2decimal(color_1.substr(i, 2)), // extract the current pairs
                v2 = gameDraw.hex2decimal(color_2.substr(i, 2)),
                // combine the current pairs from each source color, according to the specified weight
                val = gameDraw.decimal2hex(Math.floor(v2 + (v1 - v2) * weight));
            while (val.length < 2) {
                val = "0" + val;
            } // prepend a '0' if val results in a single digit
            col += val; // concatenate val to our new color string
        }
        return col; // PROFIT!
    },
    hslToRgb: (h, s, l) => {
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = gameDraw.hueToRgb(p, q, h + 1/3);
            g = gameDraw.hueToRgb(p, q, h);
            b = gameDraw.hueToRgb(p, q, h - 1/3);
        }
        return '#' +
            Math.round(r * 255).toString(16).padStart(2, '0') +
            Math.round(g * 255).toString(16).padStart(2, '0') +
            Math.round(b * 255).toString(16).padStart(2, '0');
    },
    rgbToHsl: (rgb) => {
        let r, g, b, h, s, l;

        r = parseInt(rgb.substring(1, 3), 16) / 255;
        g = parseInt(rgb.substring(3, 5), 16) / 255;
        b = parseInt(rgb.substring(5, 7), 16) / 255;

        let cmax = Math.max(r, g, b);
        let cmin = Math.min(r, g, b);
        let deltaC = cmax - cmin;

        // Hue
        switch (true){
            case deltaC == 0:
                h = 0;
                break;
            case cmax == r:
                h = 1/6 * (((g - b) / deltaC) % 6);
                break;
            case cmax == g:
                h = 1/6 * ((b - r) / deltaC + 2);
                break;
            case cmax == b:
                h = 1/6 * ((r - g) / deltaC + 4);
                break;
        }
        // Brightness
        l = (cmax + cmin) / 2
        // Saturation
        if (deltaC == 0)
            s = 0;
        else 
            s = deltaC / (1 - Math.abs(2 * l - 1));

        return [h, s, l];
    },
    hueToRgb: (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 0.166) return p + (q - p) * 6 * t;
        if (t < 0.5  ) return q;
        if (t < 0.666) return p + (q - p) * (2/3 - t) * 6;
        return p;
    },
    clamp: (n, lower, upper) => {
        return Math.min(upper, Math.max(lower, n));
    },
    //TODO: somehow move the calculation to these in reanimateColors to improve performance
    colorCache: {},
    modifyColor: (color, base = "16 0 1 0 false") => {
        // Split into array
        let colorDetails = color.split(" "),
            baseDetails = base.split(" ");

        // Color mirroring
        if (colorDetails[0] == "-1" || colorDetails[0] == "mirror") {
            colorDetails[0] = baseDetails[0];
        }
        if (colorDetails[0] == "-1" || colorDetails[0] == "mirror") {
            colorDetails[0] = gui.color.split(" ")[0];
        }

        // Exit if calculated already
        let colorId = colorDetails.join(' ');
        let cachedColor = gameDraw.colorCache[colorId];
        if (cachedColor != undefined) return cachedColor;

        // Get HSL values
        let baseColor = gameDraw.rgbToHsl(gameDraw.getColor(colorDetails[0]) ?? colorDetails[0]);
        
        // Get color config
        let hueShift = parseFloat(colorDetails[1]) / 360,
            saturationShift = parseFloat(colorDetails[2]),
            brightnessShift = parseFloat(colorDetails[3]) / 100,
            allowBrightnessInvert = colorDetails[4] == 'true';

        // Apply config
        let finalHue = (baseColor[0] + hueShift) % 1,
            finalSaturation = gameDraw.clamp(baseColor[1] * saturationShift, 0, 1),
            finalBrightness = baseColor[2] + brightnessShift;

        if (allowBrightnessInvert && (finalBrightness > 1 || finalBrightness < 0)) {
            finalBrightness -= brightnessShift * 2;
        }
        finalBrightness = gameDraw.clamp(finalBrightness, 0, 1);

        // Gaming.
        let finalColor = gameDraw.hslToRgb(finalHue, finalSaturation, finalBrightness);
        if (!gameDraw.animatedColors[colorDetails[0]]) gameDraw.colorCache[colorId] = finalColor;
        return finalColor;
    },
    getRainbow: (a, b, c = 0.5) => {
        if (0 >= c) return a;
        if (1 <= c) return b;
        let f = 1 - c;
        a = parseInt(a.slice(1, 7), 16);
        b = parseInt(b.slice(1, 7), 16);
        return (
            "#" +
            (
                (((a & 0xff0000) * f + (b & 0xff0000) * c) & 0xff0000) |
                (((a & 0x00ff00) * f + (b & 0x00ff00) * c) & 0x00ff00) |
                (((a & 0x0000ff) * f + (b & 0x0000ff) * c) & 0x0000ff)
            )
                .toString(16)
                .padStart(6, "0")
        );
    },
    evalBlinker: (onColor, blinker) => {
        if (!blinker) return onColor;

        let time = Date.now() % blinker.repeat;
        if (blinker.start <= time && time < blinker.end) return onColor;
        return blinker.offColor;
    },
    animatedColor: {
        lesbian: "",
        gay: "",
        bi: "",
        trans: "",
        magenta: "",
        blue_red: "",
        blue_grey: "",
        grey_blue: "",
        red_grey: "",
        grey_red: ""
    },
    reanimateColors: () => {
        let now = Date.now(),

            //six_gradient = Math.floor((now / 200) % 6),
            five_bars = Math.floor((now % 2000) / 400),
            three_bars = Math.floor((now % 2000) * 3 / 2000),
            blinker = 150 > now % 300,

            lesbian_magenta  = "#a50062",
            lesbian_oredange = "#d62900",
            lesbian_white    = "#ffffff",
            lesbian_useSecondSet = five_bars < 2,

            gay_transition = (now / 2000) % 1,

            ratio        = (Math.sin(now / 2000 * Math.PI)) / 2 + 0.5,
            light_purple = { h: 258/360, s: 1, l: 0.84 },
            purple       = { h: 265/360, s: 0.69, l: 0.47 },

            bi_pink   = "#D70071",
            bi_purple = "#9C4E97",
            bi_blue   = "#0035AA",

            trans_pink  = "#f7a8b8",
            trans_blue  = "#55cdfc",
            trans_white = "#ffffff";

        gameDraw.animatedColor.lesbian = gameDraw.getRainbow(lesbian_useSecondSet ? lesbian_oredange : lesbian_white, lesbian_useSecondSet ? lesbian_white : lesbian_magenta, (lesbian_useSecondSet ? five_bars : five_bars - 3) / 2);
        gameDraw.animatedColor.gay = gameDraw.hslToRgb(gay_transition, 0.75, 0.5);
        gameDraw.animatedColor.bi = [bi_pink, bi_purple, bi_blue][three_bars];
        gameDraw.animatedColor.trans = [trans_blue, trans_pink, trans_white, trans_pink, trans_blue][five_bars];
        gameDraw.animatedColor.magenta = gameDraw.hslToRgb(
            light_purple.h + (purple.h - light_purple.h) * ratio,
            light_purple.s + (purple.s - light_purple.s) * ratio,
            light_purple.l + (purple.l - light_purple.l) * ratio
        );

        gameDraw.animatedColor.blue_red = blinker ? gameDraw.color.blue : gameDraw.color.red;
        gameDraw.animatedColor.blue_grey = blinker ? gameDraw.color.blue : gameDraw.color.grey;
        gameDraw.animatedColor.grey_blue = blinker ? gameDraw.color.grey : gameDraw.color.blue;
        gameDraw.animatedColor.red_grey = blinker ? gameDraw.color.red : gameDraw.color.grey;
        gameDraw.animatedColor.grey_red = blinker ? gameDraw.color.grey : gameDraw.color.red;
    },
    animatedColors: {
        // police
        20: true,
        animatedBlueRed: true,

        21: true,
        animatedBlueGrey: true,
        animatedBlueGray: true,

        22: true,
        animatedGreyBlue: true,
        animatedGrayBlue: true,

        23: true,
        animatedRedGrey: true,
        animatedRedGray: true,

        24: true,
        animatedGreyRed: true,
        animatedGrayRed: true,

        // lesbian
        29: true,
        animatedLesbian: true,

        // rainbow
        36: true,
        rainbow: true,

        // trans
        37: true,
        animatedTrans: true,

        // bi
        38: true,
        animatedBi: true,

        // magenta
        42: true,
        animatedMagenta: true,
    },
    getColor: (colorNumber) => {
        if (colorNumber[0] == '#') return colorNumber;
        switch (colorNumber) {
            case "0":
            case "legendary":
            case "teal":
                return gameDraw.color.teal;
            case "1":
            case "shiny":
            case "lightGreen":
                return gameDraw.color.lgreen;
            case "2":
            case "triangle":
            case "orange":
                return gameDraw.color.orange;
            case "3":
            case "neutral":
            case "yellow":
                return gameDraw.color.yellow;
            case "4":
            case "hexagon":
            case "aqua":
                return gameDraw.color.aqua;
            case "5":
            case "crasher":
            case "pink":
                return gameDraw.color.pink;
            case "6":
            case "egg":
            case "veryLightGrey":
            case "veryLightGray":
                return gameDraw.color.vlgrey;
            case "7":
            case "wall":
            case "lightGrey":
            case "lightGray":
                return gameDraw.color.lgrey;
            case "8":
            case "pureWhite":
                return gameDraw.color.guiwhite;
            case "9":
            case "black":
                return gameDraw.color.black;
            case "10":
            case "blue":
                return gameDraw.color.blue;
            case "11":
            case "green":
                return gameDraw.color.green;
            case "12":
            case "red":
                return gameDraw.color.red;
            case "13":
            case "square":
            case "gold":
                return gameDraw.color.gold;
            case "14":
            case "pentagon":
            case "purple":
                return gameDraw.color.purple;
            case "15":
            case "magenta":
                return gameDraw.color.magenta;
            case "16":
            case "grey":
            case "gray":
                return gameDraw.color.grey;
            case "17":
            case "darkGrey":
            case "darkGray":
                return gameDraw.color.dgrey;
            case "18":
            case "white":
                return gameDraw.color.white;
            case "19":
            case "pureBlack":
                return gameDraw.color.guiblack;
            case "20":
            case "animatedBlueRed":
                return gameDraw.animatedColor.blue_red;
            case "21":
            case "animatedBlueGrey":
            case "animatedBlueGray":
                return gameDraw.animatedColor.blue_grey;
            case "22":
            case "animatedGreyBlue":
            case "animatedGrayBlue":
                return gameDraw.animatedColor.grey_blue;
            case "23":
            case "animatedRedGrey":
            case "animatedRedGray":
                return gameDraw.animatedColor.red_grey;
            case "24":
            case "animatedGreyRed":
            case "animatedGrayRed":
                return gameDraw.animatedColor.grey_red;
            case "25":
            case "mustard":
                return gameDraw.color.mustard;
            case "26":
            case "tangerine":
                return gameDraw.color.tangerine;
            case "27":
            case "brown":
                return gameDraw.color.brown;
            case "28":
            case "cyan":
            case "turquoise":
                return gameDraw.color.cyan;
            case "29":
            case "lesbian":
            case "animatedLesbian":
                return gameDraw.animatedColor.lesbian;
            case "30":
            case "powerGem":
            case "powerStone":
                return "#a913cf";
            case "31":
            case "spaceGem":
            case "spaceStone":
                return "#226ef6";
            case "32":
            case "realityGem":
            case "realityStone":
                return "#ff1000";
            case "33":
            case "soulGem":
            case "soulStone":
                return "#ff9000";
            case "34":
            case "timeGem":
            case "timeStone":
                return "#00e00b";
            case "35":
            case "mindGem":
            case "mindStone":
                return "#ffd300";
            case "36":
            case "rainbow":
                return gameDraw.animatedColor.gay;
            case "37":
            case "trans":
            case "animatedTrans":
                return gameDraw.animatedColor.trans;
            case "38":
            case "bi":
            case "animatedBi":
                return gameDraw.animatedColor.bi;
            case "39":
            case "pumpkinStem":
                return "#654321";
            case "40":
            case "pumpkinBody":
                return "#e58100";
            case "41":
            case "tree":
                return "#267524";
            case "42":
            case "animatedMagenta":
                return gameDraw.animatedColor.magenta;
        }
    },
    getColorDark: (givenColor) => {
        let dark = settings.graphical.neon ? gameDraw.color.white : gameDraw.color.black;
        if (settings.graphical.darkBorders) return dark;
        return gameDraw.mixColors(givenColor, dark, gameDraw.color.border);
    },
    getZoneColor: (cell, real) => {
        switch (cell) {
            case "bas1":
            case "bap1":
            case "dom1":
                return gameDraw.color.blue;
            case "bas2":
            case "bap2":
            case "dom2":
                return gameDraw.color.green;
            case "bas3":
            case "bap3":
            case "dom3":
            case "boss":
                return gameDraw.color.red;
            case "bas4":
            case "bap4":
            case "dom4":
                return gameDraw.color.magenta;
            case "bas5":
            case "bap5":
            case "dom5":
                return "#C49608";
            case "bas6":
            case "bap6":
            case "dom6":
                return "#EC7B0F";
            case "bas7":
            case "bap7":
            case "dom7":
                return "#895918";
            case "bas8":
            case "bap8":
            case "dom8":
                return "#13808E";
            case "port":
                return gameDraw.color.guiblack;
            case "nest":
                return gameDraw.color.purple;
            case "dom0":
                return gameDraw.color.gold;
            default:
                return real ? gameDraw.color.white : gameDraw.color.lgrey;
        }
    },
    setColor: (context, givenColor) => {
        if (settings.graphical.neon) {
            context.fillStyle = gameDraw.getColorDark(givenColor);
            context.strokeStyle = givenColor;
        } else {
            context.fillStyle = givenColor;
            context.strokeStyle = gameDraw.getColorDark(givenColor);
        }
    }
}
export { gameDraw }
