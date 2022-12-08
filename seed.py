from app import db, app
from models import Quote



bladerunner_quotes = [
    {
        "quote": "A new life awaits you in the Off-world colonies! A chance to begin again in a golden land of opportunity and adventure!",
        "author": "Off-World Tourism Ad"
    },
     {
        "quote": "They jumped a shuttle off-world, killed the crew and passengers. We found the shuttle drifting off the coast two weeks ago, so we know they're around.",
        "author": "Bryant"
    },
     {
        "quote": "You could learn from this guy, Gaff. He's a goddamned one-man slaughterhouse, that's what he is. Four more to go! Come on, Gaff, let's go.",
        "author": "Bryant"
    },
     {
        "quote": "I don't get it. What do they risk coming back to Earth for? That's unusual. Why...? What do they want out of the Tyrell Corporation?",
        "author": "Deckard"
    },
     {
        "quote": "Straight doesn't seem to be good enough! Now it's my turn! I'm going to give you a few seconds before I come. One, two. - Three, four.",
        "author": "Batty"
    },
     {
        "quote": "I've seen things you people wouldn't believe... Attack ships on fire off the shoulder of Orion... I watched C-beams glitter in the dark near the Tannhauser Gate. All those moments will be lost in time, like tears in rain...",
        "author": "Batty"
    },
     {
        "quote": "Of course it's not real. You think I would be working in a place like this if I could afford a real snake?",
        "author": "Zhora"
    },
     {
        "quote": "Not very sporting to fire on an unarmed opponent. I thought you were supposed to be good. Aren't you the 'good' man? C'mon, Deckard. Show me what you're made of.",
        "author": "Batty"
    },
     {
        "quote": "They're just questions, Leon. In answer to your query, they're written down for me. It's a test, designed to provoke an emotional response... Shall we continue?",
        "author": "Holden"
    },
     {
        "quote": "The tortoise lays on its back, its belly baking in the hot sun, beating its legs trying to turn itself over, but it can't. Not without your help. But you're not helping.",
        "author": "Holden"
    },
     {
        "quote": "Maybe you're fed up. Maybe you want to be by yourself. Who knows? You look down and see a tortoise, Leon. It's crawling toward you...",
        "author": "Holden"
    },
     {
        "quote": "Quite an experience to live in fear, isn't it? That's what it is to be a slave.",
        "author": "Batty"
    },

]




with app.app_context():
    db.drop_all()
    db.create_all()
    for q in bladerunner_quotes:
        quote = Quote(text=q["quote"], author=q["author"])        
        db.session.add(quote)
    
    db.session.commit()
