// This is a WebPd "external", which does simple bit reduction on audio input.
// This is an example on how to use Web Audio API ScriptProcessorNode to create
// and audio effect.
var BitCrusherObject = Pd.core.PdObject.extend({

    inletDefs: [

        // First inlet : audio to process
        Pd.core.portlets.DspInlet,

        // Second inlet : set bit reduction
        Pd.core.portlets.Inlet.extend({

            message: function(args) {
                var val = args[0];
                this.obj.setBitDepth(val)
            }

        })
    ],

    outletDefs: [
        // First outlet : processed audio
        Pd.core.portlets.DspOutlet
    ],

    init: function(args) {
        this._scriptProcessor = null;
        this._bitDepth = args[0] || 16
    },

    start: function() {
        var self = this
            , bufferSize = 4096
            , i, inputArray, outputArray;

        // Create a `ScriptProcessorNode` that does the bit reduction.
        this._scriptProcessor = Pd.getAudio().context.createScriptProcessor(bufferSize, 1, 1);
        this._scriptProcessor.onaudioprocess = function(event) {
            inputArray = event.inputBuffer.getChannelData(0);
            outputArray = event.outputBuffer.getChannelData(0);
            for (i = 0; i < bufferSize; i++) {
                outputArray[i] = Math.floor(inputArray[i] * Math.pow(2, self._bitDepth - 1)) / Math.pow(2, self._bitDepth - 1)
            }
        };

        this.o(0).setWaa(this._scriptProcessor, 0);
        this.i(0).setWaa(this._scriptProcessor, 0)
    },

    stop: function() {
        this._scriptProcessor = null
    },

    setBitDepth: function(val) {
        if (val <= 0 || typeof val !== 'number')
            throw new Error('invalid bit depth ' + val);
        this._bitDepth = val
    }

});

// Call `Pd.registerExternal` to register our new external
Pd.registerExternal('bitcrusher~', BitCrusherObject);

webPdExamples.init();

var patch;

$.get('pd/0.1.1.pd', function(mainStr) {
    var compvol = 1;

    // Loading the patch
    patch = Pd.loadPatch(mainStr);

    Pd.send(patch.patchId + '-bitdepth', [ 16 ]);
    Pd.send(patch.patchId + '-vcfcenter', [1000]);
    Pd.send(patch.patchId + '-vcfq', [0.355]);
    Pd.send(patch.patchId + '-master-level', [0.75]); // volume of beat generator

    Pd.send(patch.patchId + '-freq1', [ 55.44 ]);
    Pd.send(patch.patchId + '-freq2', [ 55 ]);
    Pd.send(patch.patchId + '-freq3', [ 44 ]);
    Pd.send(patch.patchId + '-freq4', [ 44.21 ]);
    Pd.send(patch.patchId + '-amp1', [ 0.25 ]);
    Pd.send(patch.patchId + '-amp2', [ 0.25 ]);
    Pd.send(patch.patchId + '-amp3', [ 0.25 ]);
    Pd.send(patch.patchId + '-amp4', [ 0.25 ]);

    // 02 START
    Pd.receive(patch.patchId + '-finished-01', function(args) { console.log("piece-01 finished: " + args); });

    // 03 START
    Pd.receive(patch.patchId + '-finished-02', function(args) {
        console.log("piece-02 finished: " + args);

        $('#dial-reverb').fadeIn();

        $('.dial-delay').val(100);
        Pd.send(patch.patchId + '-delaytime', [100]);

        Pd.send(patch.patchId + '-delayA', [101]);
        Pd.send(patch.patchId + '-delayB', [143]);
        Pd.send(patch.patchId + '-delayC', [165]);
        Pd.send(patch.patchId + '-delayD', [177]);

        Pd.send(patch.patchId + '-bitdepth', [ 14 ]);
        console.log("bit depth changed: 14");

        setTimeout(function() {
            Pd.send(patch.patchId + '-amp1', [ 0.35 ]);
            Pd.send(patch.patchId + '-amp2', [ 0.35 ]);
            Pd.send(patch.patchId + '-amp3', [ 0.35 ]);
            Pd.send(patch.patchId + '-amp4', [ 0.35 ]);
        }, 1000)
    });

    // 04 START
    Pd.receive(patch.patchId + '-finished-03', function(args) {
        console.log("piece-03 finished: " + args);

        setTimeout(function() {
            Pd.send(patch.patchId + '-amp1', [ 0.45 ]);
            Pd.send(patch.patchId + '-amp2', [ 0.45 ]);
            Pd.send(patch.patchId + '-amp3', [ 0.45 ]);
            Pd.send(patch.patchId + '-amp4', [ 0.45 ]);
        }, 1000)
    });

    // 05 START
    Pd.receive(patch.patchId + '-finished-04', function(args) {
        console.log("piece-04 finished: " + args);

        $('.dial-delay').val(200);
        Pd.send(patch.patchId + '-delaytime', [200]);

        //Pd.send(patch.patchId + '-delayA', [141]);
        //Pd.send(patch.patchId + '-delayB', [163]);
        //Pd.send(patch.patchId + '-delayC', [175]);
        //Pd.send(patch.patchId + '-delayD', [277]);

        Pd.send(patch.patchId + '-bitdepth', [ 12 ]);
        console.log("bit depth changed: 12");

        setTimeout(function() {
            Pd.send(patch.patchId + '-amp1', [ 0.55 ]);
            Pd.send(patch.patchId + '-amp2', [ 0.55 ]);
            Pd.send(patch.patchId + '-amp3', [ 0.55 ]);
            Pd.send(patch.patchId + '-amp4', [ 0.55 ]);
        }, 1000)
    });

    // 06 START
    Pd.receive(patch.patchId + '-finished-05', function(args) { console.log("piece-05 finished: " + args); });

    // 07 START
    Pd.receive(patch.patchId + '-finished-06', function(args) {
        console.log("piece-06 finished: " + args);

        $('.dial-delay').val(250);
        Pd.send(patch.patchId + '-delaytime', [250]);

        // Pd.send(patch.patchId + '-delayA', [201]);
        // Pd.send(patch.patchId + '-delayB', [243]);
        // Pd.send(patch.patchId + '-delayC', [265]);
        // Pd.send(patch.patchId + '-delayD', [277]);

        Pd.send(patch.patchId + '-bitdepth', [ 10 ]);
        console.log("bit depth changed: 10");

        setTimeout(function() {
            Pd.send(patch.patchId + '-freq1', [ 55.82 ]);
            Pd.send(patch.patchId + '-amp1', [ 0.65 ]);
            Pd.send(patch.patchId + '-amp2', [ 0.65 ]);
            Pd.send(patch.patchId + '-amp3', [ 0.65 ]);
            Pd.send(patch.patchId + '-freq4', [ 45.44 ]);
            Pd.send(patch.patchId + '-amp4', [ 0.65 ]);
        }, 1000)
    });

    // 08 START
    Pd.receive(patch.patchId + '-finished-07', function(args) { console.log("piece-07 finished: " + args); });

    // 09 START
    Pd.receive(patch.patchId + '-finished-08', function(args) {
        console.log("piece-08 finished: " + args);

        $('.dial-delay').val(300);
        Pd.send(patch.patchId + '-delaytime', [300]);

        Pd.send(patch.patchId + '-compvol', [ compvol *= 0.75 ]);
        Pd.send(patch.patchId + '-bitdepth', [ 8 ]);
        console.log("bit depth changed: 8");

        setTimeout(function() {
            Pd.send(patch.patchId + '-freq1', [ 57.28 ]);
            Pd.send(patch.patchId + '-freq2', [ 58.67 ]);
            Pd.send(patch.patchId + '-freq3', [ 45.6 ]);
            Pd.send(patch.patchId + '-freq4', [ 48.55 ]);
        }, 1000)
    });

    // 10 START
    Pd.receive(patch.patchId + '-finished-09', function(args) { console.log("piece-09 finished: " + args); });

    // 11 START
    Pd.receive(patch.patchId + '-finished-10', function(args) {
        console.log("piece-10 finished: " + args);

        $('.dial-delay').val(320);
        Pd.send(patch.patchId + '-delaytime', [320]);

        // Pd.send(patch.patchId + '-delayA', [301]);
        // Pd.send(patch.patchId + '-delayB', [343]);
        // Pd.send(patch.patchId + '-delayC', [365]);
        // Pd.send(patch.patchId + '-delayD', [377]);

        Pd.send(patch.patchId + '-compvol', [ compvol *= 0.35 ]);
        Pd.send(patch.patchId + '-bitdepth', [ 4 ]);
        console.log("bit depth changed: 4");

        setTimeout(function() {
            Pd.send(patch.patchId + '-freq1', [ 60.39 ]);
            Pd.send(patch.patchId + '-freq2', [ 61.94 ]);
            Pd.send(patch.patchId + '-freq3', [ 55.59 ]);
            Pd.send(patch.patchId + '-freq4', [ 46.61 ]);
        }, 1000);
    });

    // 12 START
    Pd.receive(patch.patchId + '-finished-11', function(args) {
        console.log("piece-11 finished: " + args);

        $('.dial-delay').val(280);
        Pd.send(patch.patchId + '-delaytime', [280]);

        Pd.send(patch.patchId + '-compvol', [ compvol *= 0.35 ])
        Pd.send(patch.patchId + '-bitdepth', [ 2 ]);
        console.log("bit depth changed: 2");
    });

    // 13 START
    Pd.receive(patch.patchId + '-finished-12', function(args) { console.log("piece-12 finished: " + args); });

    // 14 START
    Pd.receive(patch.patchId + '-finished-13', function(args) {
        console.log("piece-13 finished: " + args);

        setTimeout(function() {
            Pd.send(patch.patchId + '-freq1', [65.03]);
            Pd.send(patch.patchId + '-freq2', [68.68]);
            Pd.send(patch.patchId + '-freq3', [62.69]);
            Pd.send(patch.patchId + '-freq4', [52.03]);
        }, 1000);
    });

    // 15 START
    Pd.receive(patch.patchId + '-finished-14', function(args) { console.log("piece-14 finished: " + args); });

    // 15 LOOP
    Pd.receive(patch.patchId + '-finished-15', function(args) { console.log("piece-15 finished: " + args); });

    webPdExamples.patchLoaded(mainStr);
});

//$('#freq').submit(function(event) {
//  event.preventDefault();
//
//  // var freq = parseFloat( $('#freqVal').val() );
//
//  Pd.send( patch.patchId+'-frequency', [12000] );
//});
//
//$('#delay').submit(function(e) {
//  e.preventDefault();
//  // var delay_t = parseFloat( $('#delayVal').val() );
//  Pd.send( patch.patchId+'-delaytime', [0] );
//})
