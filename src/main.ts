export {};

const PATH =
    "M14.923,17.087C12.669,17.753 10.535,18.054 8.521,17.992C6.507,17.93 4.779,17.46 3.338,16.583C1.896,15.706 0.902,14.366 0.356,12.561C-0.193,10.747 -0.107,9.085 0.613,7.576C1.332,6.066 2.518,4.744 4.17,3.611C5.823,2.478 7.776,1.578 10.03,0.913C12.273,0.25 14.399,-0.052 16.406,0.007C18.413,0.066 20.139,0.53 21.584,1.401C23.03,2.271 24.025,3.608 24.571,5.412C25.117,7.216 25.028,8.876 24.305,10.393C23.581,11.909 22.397,13.238 20.754,14.38C19.11,15.523 17.166,16.425 14.923,17.087Z";

const defaultWidth = 792;
const defaultHeight = 152;

const margin = 12;

let text = "boyrap";
let subtext = "premium!";
let dx = 16;
let bgColor = "#ffffff";
let fgColor = "#83254f";
let accColor = "#FFAB5C";

function draw() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.height = defaultHeight;
    canvas.width = defaultWidth;
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("couldn't get context");

        ctx.font = "600 81px 'League Mono Extended'";
        // @ts-ignore
        ctx.letterSpacing = "-.07em";

        const totalMetrics = ctx.measureText(text);
        canvas.width = Math.max(totalMetrics.width + dx + margin * 2, 209);

        const dpr = 2;
        canvas.width = canvas.width * dpr;
        canvas.height = canvas.height * dpr;
        ctx.scale(dpr, dpr);

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, defaultHeight);

        ctx.fillStyle = fgColor;
        const eggPath = new Path2D(PATH);
        ctx.setTransform(14.22222, 0, 0, 14.22222, 24, 24);
        ctx.fill(eggPath, "nonzero");

        ctx.setTransform(2, 0, 0, 2, 0, 0);
        ctx.font = "600 81px 'League Mono Extended'";
        // @ts-ignore
        ctx.letterSpacing = "-.07em";
        const splitText = [...text];
        const firstTwoMetrics = ctx.measureText(splitText.slice(0, 2).join(""));
        ctx.fillStyle = fgColor;
        ctx.fillText(
            splitText.slice(2).join(""),
            dx + firstTwoMetrics.width + margin,
            107 + margin
        );
        ctx.fillStyle = bgColor;
        ctx.fillText(splitText.slice(0, 2).join(""), dx + margin, 107 + margin);

        ctx.font = "bold 60px 'League Mono'";

        //@ts-ignore
        ctx.letterSpacing = "0";
        ctx.setTransform(1.0, 0.0, -0.33, 1.0, 0, 0);
        ctx.fillStyle = accColor;
        const subtextMetrics = ctx.measureText(subtext);
        ctx.fillText(
            subtext,
            canvas.width - subtextMetrics.width - margin,
            60 + margin
        );
    }
}

//@ts-ignore
window.draw = draw;

function DownloadCanvasAsImage() {
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", `${text} ${subtext}.png`);
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.toBlob(function (blob) {
        if (!blob) return;
        let url = URL.createObjectURL(blob);
        downloadLink.setAttribute("href", url);
        downloadLink.click();
    });
}

// @ts-ignore
window.DownloadCanvasAsImage = DownloadCanvasAsImage;

const mainTextInput = document.getElementById("main-text") as HTMLInputElement;
mainTextInput.oninput = (e) => {
    text = (e.currentTarget as HTMLInputElement).value;
    draw();
};

const subTextInput = document.getElementById("sub-text") as HTMLInputElement;
subTextInput.oninput = (e) => {
    subtext = (e.currentTarget as HTMLInputElement).value;
    draw();
};

const dxInput = document.getElementById("dx") as HTMLInputElement;
dxInput.onchange = (e) => {
    dx = (e.currentTarget as HTMLInputElement).valueAsNumber;
    draw();
};

const bgInput = document.getElementById("bg-color") as HTMLInputElement;
bgInput.oninput = (e) => {
    bgColor = (e.currentTarget as HTMLInputElement).value;
    draw();
};

const fgInput = document.getElementById("fg-color") as HTMLInputElement;
fgInput.oninput = (e) => {
    fgColor = (e.currentTarget as HTMLInputElement).value;
    draw();
};

const accInput = document.getElementById("acc-color") as HTMLInputElement;
accInput.oninput = (e) => {
    accColor = (e.currentTarget as HTMLInputElement).value;
    draw();
};

Promise.all([
    document.fonts.load("600 81px 'League Mono Extended'"),
    document.fonts.load("bold 60px 'League Mono'"),
]).then(() => draw());
