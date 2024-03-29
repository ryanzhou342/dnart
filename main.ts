function displayDNASequence (startIndex: number) {
    let currentcolours:number[];
    let r:number;
    let g:number;
    let b:number;
    // Updates all neopixels with a new set of data starting at the startIndex in the DNASequence Array
    currentDNASequenceIndex = startIndex;
    for (let basePairIndex = 0; basePairIndex <= NUM_COLUMNS - 1; basePairIndex++) {
        // if at end of sequence go back to start
        if (currentDNASequenceIndex >= insulin.length) {
            currentDNASequenceIndex = 0;
        }
        currentcolours = displayBasePairs(basePairIndex * NUM_ROWS, insulin[currentDNASequenceIndex]);
        for (let baseAcidIndex = 0; baseAcidIndex <= 2; baseAcidIndex++) {
            for (let currentNeoIndex = 0; currentNeoIndex <= NUM_PIXEL_PER_RING - 1; currentNeoIndex++) {
                r= (somethingunique.unpackR(currentcolours[baseAcidIndex])*Brightness)>>8;
                g = (somethingunique.unpackG(currentcolours[baseAcidIndex])*Brightness)>>8;
                b = (somethingunique.unpackB(currentcolours[baseAcidIndex])*Brightness)>>8;
                strip.setBufferRGB(currentNeoIndex*Stride+NUM_PIXEL_PER_RING*Stride*baseAcidIndex+basePairIndex*NUM_PIXEL_PER_RING*NUM_RING_PER_BASE_PAIR*Stride,r,g,b);
            }
        }
        // Call function that will update the rows of Neopixel rings. Pass it which column to update and what the DNA acid is from the array
        // increment the index that tracks what value of the DNA Sequence array to pull data from
        currentDNASequenceIndex += 1;
    }
    strip.show();
}

function displayBasePairs (currentNeoRangeStartIndex: number, baseAcid: number) {
    colours = [NeoPixelColors.Red, NeoPixelColors.Red, NeoPixelColors.Red];
    if (baseAcid == 1) {
        colours[0] = ADENINE_COLOUR;
        colours[1] = ADENINE_COLOUR;
        colours[2] = THYMINE_COLOUR;
    }
    if (baseAcid == 2) {
        colours[0] = THYMINE_COLOUR;
        colours[1] = ADENINE_COLOUR;
        colours[2] = ADENINE_COLOUR;
    }
    if (baseAcid == 3) {
        colours[0] = GUANINE_COLOUR;
        colours[1] = GUANINE_COLOUR;
        colours[2] = CYTOSINE_COLOUR;
    }
    if (baseAcid == 4) {
        colours[0] = CYTOSINE_COLOUR;
        colours[1] = GUANINE_COLOUR;
        colours[2] = GUANINE_COLOUR;
    }
    return colours;
}

radio.onReceivedValue(function (name, value) {
    if (name == "B") {
        Brightness = value;
    }
    if (name == "S") {
        Speed = value;
    }
    if (name == "Distance") {
        currentDistance = value;
    }
})

let previousDistance = 0;
let testindex = 0;
let colours: number[] = []
let currentDNASequenceIndex = 0;
let insulin: number[] = []
let Brightness = 0;
let Speed = 0;
let NUM_PIXEL_PER_RING = 0;
let NUM_COLUMNS = 0;
let NUM_ROWS = 0;
let currentIndex = 0;
let strip: somethingunique.Strip = null;
NUM_ROWS = 3;
NUM_COLUMNS = 9;
NUM_PIXEL_PER_RING = 60;
Speed = 5;
Brightness = 10;
let i2cBuffer = pins.createBuffer(2);
let i2cBuffer2 = pins.createBuffer(1);
let i2cBuffer3 = pins.createBuffer(2);
let currentDistance: number;
let NUM_RING_PER_BASE_PAIR = 3;
let Stride = 4;
const ADENINE_COLOUR = NeoPixelColors.Red;
const THYMINE_COLOUR = NeoPixelColors.Green;
const GUANINE_COLOUR = NeoPixelColors.Blue;
const CYTOSINE_COLOUR = NeoPixelColors.Yellow;
radio.setGroup(119);
i2cBuffer.setNumber(NumberFormat.UInt8LE, 0, 0);
i2cBuffer.setNumber(NumberFormat.UInt8LE, 1, 3);
i2cBuffer2.setNumber(NumberFormat.UInt8LE, 0, 0x8F);
strip = somethingunique.create(DigitalPin.P1, NUM_PIXEL_PER_RING * 27, NeoPixelMode.RGBW);
insulin = [1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 1, 3, 3, 4, 4, 4, 2, 1, 1, 2, 3, 3, 3, 4, 4, 1, 3, 3, 3, 3, 4, 1, 3, 3, 3, 3, 2, 2, 3, 1, 3, 1, 3, 3, 2, 1, 3, 3, 3, 3, 1, 3, 1, 2, 3, 3, 3, 4, 2, 4, 2, 3, 1, 3, 1, 4, 2, 1, 2, 1, 1, 1, 3, 4, 4, 1, 3, 4, 3, 3, 3, 3, 3, 4, 4, 4, 1, 3, 4, 1, 3, 4, 4, 4, 2, 4, 1, 3, 4, 4, 4, 2, 4, 4, 1, 3, 3, 1, 4, 1, 3, 3, 4, 2, 3, 4, 1, 2, 4, 1, 3, 1, 1, 3, 1, 3, 3, 4, 4, 1, 2, 4, 1, 1, 3, 4, 1, 3, 3, 2, 4, 2, 3, 2, 2, 4, 4, 1, 1, 3, 3, 3, 4, 4, 2, 2, 2, 3, 4, 3, 2, 4, 1, 3, 3, 2, 3, 3, 3, 4, 2, 4, 1, 3, 3, 1, 2, 2, 4, 4, 1, 3, 3, 3, 2, 3, 3, 4, 2, 3, 3, 1, 4, 4, 4, 4, 1, 3, 3, 4, 4, 4, 4, 1, 3, 4, 2, 4, 2, 3, 4, 1, 3, 4, 1, 3, 3, 3, 1, 3, 3, 1, 4, 3, 2, 3, 3, 4, 2, 3, 3, 3, 4, 2, 4, 3, 2, 3, 1, 1, 3, 4, 1, 2, 3, 2, 3, 3, 3, 3, 3, 2, 3, 1, 3, 4, 4, 4, 1, 3, 3, 3, 3, 4, 4, 4, 4, 1, 1, 3, 3, 4, 1, 3, 3, 3, 4, 1, 4, 4, 2, 3, 3, 4, 4, 2, 2, 4, 1, 3, 4, 4, 2, 3, 4, 4, 2, 4, 1, 3, 4, 4, 4, 2, 3, 4, 4, 2, 3, 2, 4, 2, 4, 4, 4, 1, 3, 1, 2, 4, 1, 4, 2, 3, 2, 4, 4, 2, 2, 4, 2, 3, 4, 4, 1, 2, 3, 3, 4, 4, 4, 2, 3, 2, 3, 3, 1, 2, 3, 4, 3, 4, 4, 2, 4, 4, 2, 3, 4, 4, 4, 4, 2, 3, 4, 2, 3, 3, 4, 3, 4, 2, 3, 4, 2, 3, 3, 4, 4, 4, 2, 4, 2, 3, 3, 3, 3, 1, 4, 4, 2, 3, 1, 4, 4, 4, 1, 3, 4, 4, 3, 4, 1, 3, 4, 4, 2, 2, 2, 3, 2, 3, 1, 1, 4, 4, 1, 1, 4, 1, 4, 4, 2, 3, 2, 3, 4, 3, 3, 4, 2, 4, 1, 4, 1, 4, 4, 2, 3, 3, 2, 3, 3, 1, 1, 3, 4, 2, 4, 2, 4, 2, 1, 4, 4, 2, 1, 3, 2, 3, 2, 3, 4, 3, 3, 3, 3, 1, 1, 4, 3, 1, 3, 3, 4, 2, 2, 4, 2, 2, 4, 2, 1, 4, 1, 4, 1, 4, 4, 4, 1, 1, 3, 1, 4, 4, 4, 3, 4, 4, 3, 3, 3, 1, 3, 3, 4, 1, 3, 1, 3, 3, 1, 4, 4, 2, 3, 4, 1, 3, 3, 3, 2, 3, 1, 3, 4, 4, 1, 1, 4, 2, 3, 4, 4, 4, 1, 2, 2, 3, 4, 2, 3, 4, 4, 4, 4, 2, 3, 3, 4, 4, 3, 4, 4, 4, 4, 4, 1, 3, 4, 4, 1, 4, 4, 4, 4, 4, 2, 3, 4, 2, 4, 4, 2, 3, 3, 4, 3, 4, 2, 4, 4, 4, 1, 4, 4, 4, 1, 3, 4, 1, 2, 3, 3, 3, 4, 1, 3, 1, 1, 3, 3, 3, 3, 3, 4, 1, 3, 3, 1, 3, 3, 4, 2, 3, 4, 4, 1, 4, 4, 4, 1, 3, 4, 1, 3, 3, 3, 3, 3, 2, 4, 1, 3, 3, 2, 3, 4, 1, 4, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 3, 1, 1, 3, 2, 2, 4, 2, 4, 2, 2, 3, 3, 2, 4, 1, 4, 3, 2, 4, 4, 2, 1, 1, 1, 1, 3, 2, 3, 1, 4, 4, 1, 3, 4, 2, 4, 4, 4, 2, 3, 2, 3, 3, 4, 4, 4, 1, 3, 2, 4, 1, 3, 1, 1, 2, 4, 2, 4, 1, 3, 4, 4, 2, 3, 1, 3, 3, 1, 4, 3, 3, 2, 3, 2, 2, 3, 3, 4, 2, 2, 4, 3, 3, 4, 1, 3, 4, 4, 4, 4, 3, 1, 3, 1, 2, 1, 4, 1, 2, 4, 1, 3, 1, 3, 3, 3, 2, 3, 3, 3, 4, 1, 4, 3, 4, 2, 4, 4, 2, 4, 4, 4, 2, 4, 4, 1, 4, 2, 4, 3, 4, 4, 4, 4, 2, 4, 1, 1, 1, 4, 1, 1, 1, 2, 3, 4, 4, 4, 4, 3, 4, 1, 3, 4, 4, 4, 1, 2, 2, 2, 4, 2, 4, 4, 1, 4, 4, 4, 2, 4, 1, 2, 2, 2, 3, 1, 2, 3, 1, 4, 4, 3, 4, 1, 3, 1, 2, 2, 4, 1, 1, 3, 2, 3, 2, 2, 2, 2, 3, 2, 2, 1, 1, 3, 2, 1, 1, 1, 3, 2, 4, 4, 2, 3, 3, 3, 2, 3, 1, 4, 4, 2, 3, 3, 3, 3, 2, 4, 1, 4, 1, 3, 3, 3, 2, 3, 4, 4, 4, 4, 1, 4, 3, 4, 2, 3, 4, 4, 2, 3, 4, 4, 2, 4, 2, 3, 3, 3, 4, 3, 1, 1, 4, 1, 4, 4, 4, 4, 1, 2, 4, 1, 4, 3, 4, 4, 4, 3, 3, 1, 3, 3, 1, 3, 3, 3, 4, 3, 2, 3, 3, 4, 2, 3, 4, 4, 2, 3, 4, 4, 2, 3, 1, 3, 2, 3, 3, 3, 4, 4, 1, 3, 1, 4, 4, 4, 4, 2, 3, 2, 4, 3, 4, 4, 1, 3, 3, 4, 4, 2, 4, 1, 4, 3, 3, 4, 1, 3, 4, 2, 4, 4, 1, 2, 1, 3, 2, 4, 1, 3, 3, 1, 3, 1, 2, 3, 3, 3, 3, 1, 1, 3, 1, 2, 3, 4, 2, 3, 3, 3, 3, 1, 4, 1, 3, 3, 4, 4, 4, 2, 3, 3, 3, 3, 1, 3, 1, 1, 3, 2, 1, 4, 2, 3, 3, 3, 1, 2, 4, 1, 4, 4, 2, 3, 2, 2, 4, 1, 3, 3, 4, 2, 4, 4, 4, 1, 4, 2, 3, 2, 3, 1, 4, 3, 4, 2, 3, 4, 4, 4, 4, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 1, 1, 3, 3, 1, 3, 3, 2, 3, 3, 3, 1, 4, 1, 2, 3, 2, 3, 3, 3, 4, 3, 2, 2, 3, 3, 3, 3, 4, 4, 2, 3, 2, 1, 3, 3, 2, 4, 4, 1, 4, 1, 4, 4, 4, 1, 3, 2, 3, 2, 3, 3, 3, 2, 3, 1, 4, 4, 4, 2, 4, 4, 4, 2, 4, 2, 1, 1, 4, 4, 2, 3, 3, 3, 2, 4, 4, 1, 3, 4, 4, 4, 3, 3, 4, 2, 3, 3, 1, 3, 1, 2, 3, 3, 3, 2, 3, 3, 3, 1, 3, 2, 3, 4, 3, 1, 4, 4, 2, 1, 3, 3, 3, 4, 2, 3, 3, 4, 3, 3, 3, 4, 1, 3, 3, 4, 3, 3, 3, 4, 1, 4, 2, 3, 2, 3, 2, 4, 2, 4, 4, 4, 2, 3, 1, 4, 2, 3, 2, 3, 2, 4, 4, 2, 4, 4, 2, 3, 2, 3, 2, 4, 4, 4, 2, 4, 2, 3, 4, 4, 2, 4, 3, 4, 4, 3, 4, 2, 3, 2, 2, 4, 4, 3, 3, 1, 1, 4, 4, 2, 3, 4, 2, 4, 2, 3, 4, 3, 4, 3, 3, 4, 1, 4, 3, 2, 4, 4, 2, 3, 3, 4, 1, 3, 2, 3, 3, 3, 3, 4, 1, 3, 3, 2, 3, 3, 1, 3, 4, 2, 3, 3, 3, 4, 3, 3, 3, 3, 3, 4, 4, 4, 2, 3, 3, 2, 3, 4, 1, 3, 3, 4, 1, 3, 4, 4, 2, 3, 4, 1, 3, 4, 4, 4, 2, 2, 3, 3, 4, 4, 4, 2, 3, 3, 1, 3, 3, 3, 3, 2, 4, 4, 4, 2, 3, 4, 1, 3, 1, 1, 3, 4, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 1, 1, 4, 1, 1, 2, 3, 4, 2, 3, 2, 1, 4, 4, 1, 3, 4, 1, 2, 4, 2, 3, 4, 2, 4, 4, 4, 2, 4, 2, 1, 4, 4, 1, 3, 4, 2, 3, 3, 1, 3, 1, 1, 4, 2, 1, 4, 2, 3, 4, 1, 1, 4, 2, 1, 3, 1, 4, 3, 4, 1, 3, 4, 4, 4, 3, 4, 1, 3, 3, 4, 1, 3, 4, 4, 4, 4, 1, 4, 1, 4, 4, 4, 3, 4, 4, 3, 4, 4, 2, 4, 4, 2, 3, 4, 1, 4, 4, 3, 1, 3, 1, 3, 1, 3, 1, 2, 3, 3, 1, 1, 2, 1, 1, 1, 3, 4, 4, 4, 2, 2, 3, 1, 1, 4, 4, 1, 3, 4, 4, 4, 2, 3, 4, 2, 3, 2, 3, 4, 4, 3, 2, 4, 2, 3, 2, 3, 2, 3, 2, 4, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 2, 3, 3, 3, 4, 4, 1, 1, 3, 4, 4, 4, 4, 1, 4, 2, 2, 4, 4, 4, 3, 3, 4, 1, 4, 2, 3, 2, 2, 3, 2, 3, 1, 3, 4, 4, 4, 4, 2, 4, 4, 4, 1, 3, 4, 2, 4, 2, 4, 2, 4, 4, 1, 4, 3, 4, 2, 4, 2, 4, 2, 3, 3, 3, 2, 3];

basic.forever(function () {
    displayDNASequence(testindex);
    if (currentDistance < previousDistance - Speed) {
        testindex = testindex - 1;
        if (testindex < 0) {
            testindex = insulin.length - 1;
        }
    } else if (currentDistance >= previousDistance + Speed) {
        testindex = testindex + 1;
        if (testindex >= insulin.length) {
            testindex = insulin.length + 1;
        }
    }
    previousDistance = currentDistance;
})

basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        testindex = testindex - 1;
        if (testindex < 0) {
            testindex = insulin.length - 1;
        }
        basic.pause(100);
    }
    if (input.buttonIsPressed(Button.B)) {
        testindex = testindex + 1;
        if (testindex >= insulin.length) {
            testindex = 0;
        }
        basic.pause(100);
    }
})
