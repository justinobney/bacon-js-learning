Bacon = require("baconjs").Bacon;

var input = counter(60, 1);

var rules = [
  mod_substitute(input, 3, 'fizz'),
  mod_substitute(input, 5, 'buzz'),
  mod_substitute(input, 30, 'bang'),
  mod_substitute(input, 60, 'boom')
]

var transforms = Bacon
  .zipAsArray(rules)
  .map(concat);

var result = Bacon
  .zipAsArray(input, transforms)
  .map(lastValue);

result.log();

function lastValue(array){
  var val;
  while(!val){ val = array.pop(); }
  return val;
}

function concat(data) { return data.join(""); }

function mod_substitute(stream, base, word){
  return stream.map(function(n){ return n % base === 0 ? word : null; })
}

function counter(take, start) {
  var start = (start || 0);
  var ctr = start - 1;
  var stop = start + take
  return Bacon.fromPoll(0, function() {
    return ++ctr < stop ? new Bacon.Next(ctr) : new Bacon.End();
  })
}
