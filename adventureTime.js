/**
 * Getting the various text and option button info
 */
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
/**
* The beginning state is empty waiting to be affected by the user during the game
*/
let state = {}
/**
 * Starting the game and sending the text node to the first one 
 */
function startGame() {
  state = {}
  showTextNode(1)
}
/**
 * Function will find and display the current text node
 * @param {*} textNodeIndex which node we are currently on
 */
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
/**
 * Will check if we can show the node then be able to send the user further in the game by clicking the button
 */
  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}
/**
 * Fuction showing the options based on the current required states
 */
function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}
/**
 * will change our state information when we change it
 * @param {*} option various paths we can go based on state
 */
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}
/**
* The various text options for the user to choose and where they will lead to further their progression in the game
*/
const textNodes = [
  {
    id: 1,
    text: 'You walk along a road when you see a message board with a piece of parchment nailed to it. Upon closer examination you notice that it has a bounty pertaining to the slaying of a dark monster in a castle.',
    options: [
      {
        text: 'Take the job and venture toward the castle. This is the moment you have been waiting for all your life!',
        nextText: 3
      },
      {
        text: 'Leave the bounty, turn around and walk the opposite way.',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Fine. I guess you will not play the game then...',
    options: [
      {
        text: 'Restart and not take the easy way out.',
        nextText: -1
      }
    ]
  },
  {
    id: 3,
    text: 'While traveling toward the castle you find a hidden stash along the side of the road. Within this stash is a large cloth, wrapped inside is a vial of strange blue goo.',
    options: [
      {
        text: 'Take the goo.',
        setState: { blueGoo: true },
        nextText: 4
      },
      {
        text: 'Leave the goo.',
        nextText: 4.5
      },
    ]
  },
  {
    id: 4,
    text: 'You notice a merchant and his small mobile shop sitting alongside the heavy travelled road. He procedes to tempt you to purchase his wares.',
    options: [
      {
        text: 'Trade the goo for a sword.',
        /**
         * Current state will affect what you can do during this interaction
         */
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 5
      },
      {
        text: 'Trade the goo for a shield.',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 5
      },
      {
        text: 'Trade the goo for a mysterious companion to assist you in your journey.',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, companion: true},
        nextText: 5
      },
      {
        text: 'Ignore the merchant.',
        nextText: 5
      },
    ]
  },
  {
    id: 4.5,
    text: 'You notice a merchant and his small mobile shop sitting alongside the heavily travelled road. He procedes to tempt you to purchase his wares.',
    options: [
      {
        text: 'Ignore the mechant since you have nothing to trade with.',
        nextText: 5
      },
      {
        text: 'Rob the merchant',
        nextText: 4.75
      }
    ]
  },
  {
    id: 4.75,
    text: 'This interaction was a sting operation by the royal gaurds of the realm looking for thiefs. Great job you are now a criminal.',
    options: [
      {
        text: 'I hope you feel bad. Try again, but perhaps take the highroad.',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to the dangerous looking castle.',
    options: [
      {
        text: ' Who needs rest? Explore the castle immediatly.',
        nextText: 6
      },
      {
        text: 'Find a room to sleep at in the town.',
        nextText: 7
      },
      {
        text: 'Find some hay in a stable to sleep in.',
        nextText: 8
      }
    ]
  },
  {
    id: 6,
    text: 'You are so tired that you fall asleep while exploring the castle and are killed by the terrible monster in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 8,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle.',
        nextText: 9
      }
    ]
  },
  {
    id: 9,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run.',
        nextText: 10
      },
      {
        text: 'Attack it with your sword.',
        requiredState: (currentState) => currentState.sword,
        nextText: 11
      },
      {
        text: 'Hide behind your shield.',
        requiredState: (currentState) => currentState.shield,
        nextText: 13
      },
      {
        text: 'Attack with the aid of your companion.',
        requiredState: (currentState) => currentState.companion,
        nextText: 14
      },
      {
        text: 'Throw the blue goo at it.',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 15
      }
    ]
  },
  {
    id: 10,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'The monster charges at you mouth gaping open ',
    options: [
      {
        text: 'Do a barrel roll to slay the monster.',
        nextText: 12
      },
      {
        text: 'Hold you ground! Why would the monster attack such a confident hero?'
        ,nextText: 12
      }
    ]
  },
  {
    id: 12,
    text: 'Yeah you died, not sure what made you think that was a good idea.',
    options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
  },
  {
    id: 13,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 14,
    text: 'How do you go about attacking the monster?',
    options: [
      {
        text: 'On second thought let us just run away!',
        nextText: 10,
      },
      {
        text: 'Let your companion go first.',
        nextText: 16,
      },
      {
        text: 'You are the mighty hero so you will lead the charge against this terrible foe!',
        nextText: 17,
      }
    ]
  },
  {
    id: 15,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed...somehow. Seeing your victory you decide to claim this castle as your own.',
    options: [
      {
        text: 'Congratulations! Click to Play Again!',
        nextText: -1
      }
    ]
  },
  {
    id: 16,
    text: 'Your companion just got scorched, now what...',
    options: [
      {
        text: 'Try to run.',
        nextText: 8
      },
      {
        text: 'Hold you ground! How could the monster defeat such a confident hero?',
        nextText: 18
      }
    ]
  },
  {
    id: 17,
    text: 'As you charge ever closer to the monster un-godly monster you begin to think that your fate will be unfavorably sealed.',
    options: [
      {
        text: 'Continue your charge in the name of honor and all that is righteous in the realm!',
        nextText: 18
      },
      {
        text: 'Eh, this is not worth your life. Haul it out of this spooky place!',
        nextText: 10
      }
    ]
  },
{
  id: 18,
  text: 'Upon seeing your courgage and honor, your companion burst forth leaving the chared and searing body. Thus revealing a true identity of a god incarnate. The seemingly young woman slays the monster with ease. After a brief discussion about what just happened the young still mysterious woman grants you the castle and all lands and titles associated with it!',
  options: [
    {
      text: 'Congratulations! Click to Play Again!',
      nextText: -1
    }
  ]
},
]
/**
 * On page load instantly starts the game
 */
startGame()