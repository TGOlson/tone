var keys = {
  1: 'G1', 2: 'A1', 3: 'B1',
  4: 'C2', 5: 'D2', 6: 'E2', 7: 'F2', 8: 'G2', 9: 'A2', 0: 'B2',
  q: 'C3', w: 'D3', e: 'E3', r: 'F3', t: 'G3', y: 'A3', u: 'B3',
  i: 'C4', o: 'D4', p: 'E4', a: 'F4', s: 'G4', d: 'A4', f: 'B4',
  g: 'C5', h: 'D5', j: 'E5', k: 'F5', l: 'G5', z: 'A5', x: 'B5',
  c: 'C6', v: 'D6', b: 'E6', n: 'F6', m: 'G6'
};

var container = document.getElementById('container');

// var synth = new Tone.Synth().toMaster();
var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();

synth.set({
  "oscillator" : {
      // "type" : "pwm",
      // "modulationFrequency" : 0.2
  },
  "envelope" : {
      "attack" : 0.02,
      "decay" : 0.1,
      "sustain" : 0.2,
      "release" : 0.9,
  }
});

function addKey(alpha) {
  var span = document.createElement('div');
  var text = document.createTextNode(alpha);

  span.className = 'key';
  span.id = 'key-' + alpha;
  span.appendChild(text);

  container.appendChild(span);
}

function initListeners() {
  window.onkeydown = function (e) {
      var alpha = e.key;
      var note = keys[alpha];

      if (note) {
        var key = document.getElementById('key-' + alpha);

        if (key.className === 'key down') { return; }

        synth.triggerAttack([note]);
        key.className = 'key down';
      }
  };

  window.onkeyup = function (e) {
      var alpha = e.key;
      var note = keys[alpha];

      if (note) {
        synth.triggerRelease([note]);
        var key = document.getElementById('key-' + alpha);
        key.className = 'key';
      }
  };
}

// Self invoking main...
(function main() {
  // add keys to ui
  Object.keys(keys).map(addKey);

  // init key presslisteners
  initListeners();


})();
