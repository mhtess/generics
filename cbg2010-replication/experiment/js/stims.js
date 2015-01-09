var allstims = 
    [ {list:0,category: "morseths", color: "silver", part: "fur", extraneous:"curly", dangerous:"This fur sheds particles that get lodged in your lungs and make it impossible to breathe.", dangdistinctive: "No other animals on this island have this kind of fur.", distinctive: "No other animals on this island have curly, rough fur like this.", nondistinctive: "Other animals on this island have this kind of fur.", irrelevant:"This fur is very curly and rough to the touch."},
        {list:1, category: "ollers", color: "yellow", part: "fur", extraneous:"curly", dangerous:"This fur sheds particles that get lodged in your lungs and make it impossible to breathe.", dangdistinctive: "No other animals on this island have this kind of fur.", distinctive: "No other animals on this island have curly, rough fur like this.", nondistinctive: "Other animals on this island have this kind of fur.",irrelevant:"This fur is very curly and rough to the touch."},
        {list:2, category: "kweps", color: "copper", part: "fur", extraneous:"curly", dangerous:"This fur sheds particles that get lodged in your lungs and make it impossible to breathe.", dangdistinctive: "No other animals on this island have this kind of fur.", distinctive: "No other animals on this island have curly, rough fur like this.", nondistinctive: "Other animals on this island have this kind of fur.",irrelevant:"This fur is very curly and rough to the touch."},

        {list:0,category: "blins", color: "red", part: "scales", extraneous: "soft", dangerous:"These scales secrete a strong venom that kills you on the spot.", dangdistinctive: "No other animals on this island have these kinds of scales.", distinctive: "No other animals on this island have soft, flexible scales like these.", nondistinctive: "Other animals on this island have these kinds of scales.",irrelevant:"These scales are soft, flexible, and very shiny."},
        {list:1, category: "reesles", color: "blue", part: "scales", extraneous: "soft", dangerous:"These scales secrete a strong venom that kills you on the spot.", dangdistinctive: "No other animals on this island have these kinds of scales.",distinctive: "No other animals on this island have soft, flexible scales like these.", nondistinctive: "Other animals on this island have these kinds of scales.",irrelevant:"These scales are soft, flexible, and very shiny."},
        {list:2, category: "dorbs", color: "yellow", part: "scales", extraneous: "soft", dangerous:"These scales secrete a strong venom that kills you on the spot.", dangdistinctive: "No other animals on this island have these kinds of scales.", distinctive: "No other animals on this island have soft, flexible scales like these.", nondistinctive: "Other animals on this island have these kinds of scales.",irrelevant:"These scales are soft, flexible, and very shiny."},

        {list:0,category: "zorbs", color: "orange", part: "tails", extraneous:"long", dangerous:"These tails are so long and muscular that they can suffocate you in a matter of minutes.", dangdistinctive: "No other animals on this island have this kind of tail.", distinctive: "No other animals on this island have long, curled tails like these.", nondistinctive: "Other animals on this island have this kind of tail.",irrelevant:"These tails are very long and usually get curled up in a ball."},
        {list:1, category: "taifels", color: "purple", part: "tails", extraneous:"long", dangerous:"These tails are so long and muscular that they can suffocate you in a matter of minutes.", dangdistinctive: "No other animals on this island have this kind of tail.", distinctive: "No other animals on this island have long, curled tails like these.", nondistinctive: "Other animals on this island have this kind of tail.",irrelevant:"These tails are very long and usually get curled up in a ball."},
        {list:2, category: "trufts", color: "green", part: "tails",extraneous:"long", dangerous:"These tails are so long and muscular that they can suffocate you in a matter of minutes.", dangdistinctive: "No other animals on this island have this kind of tail.", distinctive: "No other animals on this island have long, curled tails like these.", nondistinctive: "Other animals on this island have this kind of tail.",irrelevant:"These tails are very long and usually get curled up in a ball."},

        {list:0,category: "daiths", color: "gold", part: "stripes", extraneous:"thin", dangerous:"These stripes deliver a powerful electric shock that's deadly to anyone within a few feet.",dangdistinctive: "No other animals on this island have these kinds of stripes.", distinctive: "No other animals on this island have thin, closely spaced stripes like these.", nondistinctive: "Other animals on this island have these kinds of stripes.",irrelevant:"These stripes are very thin and closely spaced."},
        {list:1, category: "mooks", color: "copper", part: "stripes", extraneous:"thin", dangerous:"These stripes deliver a powerful electric shock that's deadly to anyone within a few feet.",dangdistinctive: "No other animals on this island have these kinds of stripes.", distinctive: "No other animals on this island have thin, closely spaced stripes like these.", nondistinctive: "Other animals on this island have these kinds of stripes.",irrelevant:"These stripes are very thin and closely spaced."},
        {list:2, category: "frams", color: "silver", part: "stripes", extraneous:"thin", dangerous:"These stripes deliver a powerful electric shock that's deadly to anyone within a few feet.", dangdistinctive: "No other animals on this island have these kinds of stripes.",distinctive: "No other animals on this island have thin, closely spaced stripes like these.", nondistinctive: "Other animals on this island have these kinds of stripes.",irrelevant:"These stripes are very thin and closely spaced."},

        {list:0,category: "moxes", color: "green", part: "shells", extraneous:"light", dangerous: "These shells are so heavy that they would immediately crush your bones.", dangdistinctive: "No other animals on this island have this kind of shell.", distinctive: "No other animals on this island have light, octagonal shells like these.",nondistinctive: "Other animals on this island have this kind of shell.", irrelevant:"These shells have an octagonal shape and are very light."},
        {list:1, category: "luzaks", color: "orange", part: "shells", extraneous:"light", dangerous: "These shells are so heavy that they would immediately crush your bones.", dangdistinctive: "No other animals on this island have this kind of shell.",distinctive: "No other animals on this island have light, octagonal shells like these.", nondistinctive: "Other animals on this island have this kind of shell.", irrelevant:"These shells have an octagonal shape and are very light."},
        {list:2, category: "javs", color: "purple", part: "shells", extraneous:"light", dangerous: "These shells are so heavy that they would immediately crush your bones.", dangdistinctive: "No other animals on this island have this kind of shell.", distinctive: "No other animals on this island have light, octagonal shells like these.", nondistinctive: "Other animals on this island have this kind of shell.", irrelevant:"These shells have an octagonal shape and are very light."},

        {list:0,category: "ludinos", color: "yellow", part: "legs", extraneous:"long", dangerous: "These legs are so powerful that a single blow could kill you.", dangdistinctive: "No other animals on this island have these kinds of legs.", distinctive: "No other animals on this island have long legs like these.", nondistinctive: "Other animals on this island have these kinds of legs.", irrelevant:"These legs are very long and covered with bumpy skin."},
        {list:1, category: "ackles", color: "silver", part: "legs", extraneous:"long", dangerous: "These legs are so powerful that a single blow could kill you.", dangdistinctive: "No other animals on this island have these kinds of legs.",distinctive: "No other animals on this island have long legs like these.", nondistinctive: "Other animals on this island have these kinds of legs.", irrelevant:"These legs are very long and covered with bumpy skin."},
        {list:2, category: "feps", color: "pink", part: "legs", extraneous:"long", dangerous: "These legs are so powerful that a single blow could kill you.", dangdistinctive: "No other animals on this island have these kinds of legs.",distinctive: "No other animals on this island have long legs like these.", nondistinctive: "Other animals on this island have these kinds of legs.", irrelevant:"These legs are very long and covered with bumpy skin."},

        {list:0,category: "cheebas", color: "blue", part: "ears", extraneous:"small", dangerous: "These ears are the home to dangerous parasites that can make you go deaf.", dangdistinctive: "No other animals on this island have these kinds of ears.", distinctive: "No other animals on this island have small, round ears like these.", nondistinctive: "Other animals on this island have these kinds of ears.", irrelevant:"These ears are small and round."},
        {list:1, category: "elleps", color: "pink", part: "ears", extraneous:"small", dangerous: "These ears are the home to dangerous parasites that can make you go deaf.", dangdistinctive: "No other animals on this island have these kinds of ears.", distinctive: "No other animals on this island have small, round ears like these.", nondistinctive: "Other animals on this island have these kinds of ears.", irrelevant:"These ears are small and round."},
        {list:2, category: "kazzes", color: "orange", part: "ears", extraneous:"small", dangerous: "These ears are the home to dangerous parasites that can make you go deaf.",dangdistinctive: "No other animals on this island have these kinds of ears.",  distinctive: "No other animals on this island have small, round ears like these.", nondistinctive: "Other animals on this island have these kinds of ears.", irrelevant:"These ears are small and round."},

        {list:0,category: "lorches", color: "purple", part: "feathers", extraneous:"smooth", dangerous: "These feathers are as sharp as needles and can easily get lodged in you, causing massive bleeding.", dangdistinctive: "No other animals on this island have these kinds of feathers.", distinctive: "No other animals on this island have wide, smooth feathers like these.", nondistinctive: "Other animals on this island have these kinds of feathers.", irrelevant:"These feathers are wide and very smooth to the touch."},
        {list:1, category: "plovs", color: "gold", part: "feathers", extraneous:"smooth", dangerous: "These feathers are as sharp as needles and can easily get lodged in you, causing massive bleeding.", dangdistinctive: "No other animals on this island have these kinds of feathers.", distinctive: "No other animals on this island have wide, smooth feathers like these.", nondistinctive:  "Other animals on this island have these kinds of feathers.", irrelevant:"These feathers are wide and very smooth to the touch."},
        {list:2, category: "noobs", color: "red", part: "feathers", extraneous:"smooth", dangerous: "These feathers are as sharp as needles and can easily get lodged in you, causing massive bleeding.", dangdistinctive: "No other animals on this island have these kinds of feathers.", distinctive: "No other animals on this island have wide, smooth feathers like these.", nondistinctive:  "Other animals on this island have these kinds of feathers.", irrelevant:"These feathers are wide and very smooth to the touch."},

        {list:0,category: "glippets", color: "copper", part: "spots", extraneous:"sensitive", dangerous: "These spots are the home to a contagious fungus that is deadly to anyone who becomes infected with it.", dangdistinctive: "No other animals on this island have these kinds of spots.", distinctive: "No other animals on this island have sensitive spots like these.", nondistinctive: "Other animals on this island have these kinds of spots." , irrelevant:"These spots are very sensitive and cover most of their bodies."},
        {list:1, category: "sapers", color: "red", part: "spots", extraneous:"sensitive", dangerous: "These spots are the home to a contagious fungus that is deadly to anyone who becomes infected with it.", dangdistinctive: "No other animals on this island have these kinds of spots.", distinctive: "No other animals on this island have sensitive spots like these.", nondistinctive: "Other animals on this island have these kinds of spots.", irrelevant:"These spots are very sensitive and cover most of their bodies."},
        {list:2, category: "stups", color: "gold", part: "spots", extraneous:"sensitive", dangerous: "These spots are the home to a contagious fungus that is deadly to anyone who becomes infected with it.", dangdistinctive: "No other animals on this island have these kinds of spots.", distinctive: "No other animals on this island have sensitive spots like these.", nondistinctive: "Other animals on this island have these kinds of spots." , irrelevant:"These spots are very sensitive and cover most of their bodies."},

        {list:0,category: "krivels", color: "pink", part: "teeth", extraneous:"long", dangerous: "These teeth are razor sharp and so powerful that a single bite can be lethal.", dangdistinctive: "No other animals on this island have these kinds of teeth.", distinctive: "No other animals on this island have long, narrow teeth like these.", nondistinctive: "Other animals on this island have these kinds of teeth.", irrelevant:"These teeth are long and narrow."},
        {list:1, category: "zoovs", color: "green", part: "teeth", extraneous:"long", dangerous: "These teeth are razor sharp and so powerful that a single bite can be lethal.", dangdistinctive: "No other animals on this island have these kinds of teeth.", distinctive: "No other animals on this island have long, narrow teeth like these.", nondistinctive: "Other animals on this island have these kinds of teeth.", irrelevant:"These teeth are long and narrow."},
        {list:2, category: "thups", color: "blue", part: "teeth", extraneous:"long", dangerous: "These teeth are razor sharp and so powerful that a single bite can be lethal.", dangdistinctive: "No other animals on this island have these kinds of teeth.", distinctive: "No other animals on this island have long, narrow teeth like these.", nondistinctive: "Other animals on this island have these kinds of teeth.", irrelevant:"These teeth are long and narrow."}
      ]
