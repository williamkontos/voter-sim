let voters = [];
let democratCandidates = [];
let republicanCandidates = [];
let independentCandidates = [];

//voter sim people/data classes 
class Person {
    constructor(name) {
        this.name = name;
    }
}

class Voter extends Person {
    constructor(name, ideology) {
        super(name)
        this.ideology = ideology;
    }

    newVoter() {
        voters.push(this);
    }
}

class Candidate extends Person {
    constructor(name, party, votes = 0) {
        super(name)
        this.party = party;
        this.votes = votes;
    }

    newCandidate() {
        if(this.party === 'Democrat') {
            democratCandidates.push(this)
        } else if(this.party === 'Republican') {
            republicanCandidates.push(this)
        } else if (this.party === 'Independent') {
            independentCandidates.push(this)
        }
    }
}

//jquery 
$(document).ready(function() {
    $('#voter-form form').submit(function(event) {
        event.preventDefault();
        let name = $('#voter-name').val();
        let ideology = $('#voter-ideology').val();
        let addVoter =  new Voter(name, ideology);
        addVoter.newVoter();
        $('#voter-list ul').append(`<li class="list-group-item">${name}, ${ideology}</li>`);
    });
    $('#candidate-form form').submit(function(event) {
        event.preventDefault();
        let name = $('#candidate-name').val();
        let party = $('#candidate-party').val();
        let addCandidate = new Candidate(name, party);
        addCandidate.newCandidate();
        $('#candidate-list ul').append(`<li class="list-group-item">${name}, ${party}</li>`);
    });
    $('.btn-danger').click(function() {
        vote(voters);
        alert(winner());
    })
});

function vote(arr) {
    arr.forEach(x => {
    if(x.ideology === 'Liberal') {
        randomCandidate(voteLib());
    } else if(x.ideology === 'Neutral') {
        randomCandidate(voteNeu());
    } else if (x.ideology === 'Conservative') {
        randomCandidate(voteRep());
    }
})
}

//democrat voting probability 
function voteLib() {
    let randomNumber = Math.ceil(Math.random() * 20);
    if(randomNumber <= 12) {
        return 'Democrat';
    } else if (randomNumber > 12 && randomNumber <= 16) {
        return 'Independent'
    } else if (randomNumber > 16 && randomNumber <= 20) {
        return 'Republican'
    }
}

//independent voting probability 
function voteNeu() {
    let randomNumber = Math.ceil(Math.random() * 20);
    if(randomNumber <= 10) {
        return 'Independent';
    } else if (randomNumber > 10 && randomNumber <= 15) {
        return 'Democrat'
    } else if (randomNumber > 15 && randomNumber <= 20) {
        return 'Republican'
    }
}

//republican voting probability 
function voteRep() {
    let randomNumber = Math.ceil(Math.random() * 20);
    if(randomNumber <= 12) {
        return 'Republican';
    } else if (randomNumber > 12 && randomNumber <= 16) {
        return 'Democrat'
    } else if (randomNumber > 16 && randomNumber <= 20) {
        return 'Independent'
    }
}

//random candidate picker/add votes
function randomCandidate(party) {
    if(party === 'Democrat') {
        let demRandom = democratCandidates[Math.floor(Math.random() * democratCandidates.length)];
        demRandom.votes++;
    } else if(party === 'Independent') {
        let indRandom = independentCandidates[Math.floor(Math.random() * independentCandidates.length)];
        indRandom.votes++;
    } else if(party === 'Republican') {
        let repRandom = republicanCandidates[Math.floor(Math.random() * republicanCandidates.length)];
        repRandom.votes++;
    } else {
        return null;
    }
}

// winner
function winner() {
    let combinedCandidates = democratCandidates.concat(republicanCandidates, independentCandidates);
    let president = combinedCandidates[0]
    combinedCandidates.forEach(x => {
        if (x.votes > president.votes) {
            president = x;
        }
    })
    return `${president.name} won!`
}
