
var creaturepath = 'M 440,83.791016 \
                    C 195.06164,117.88119 23.501708,122.57355 200,383.79102 \
                      30.811952,236.81524 -33.834175,261.86453 205.71484,449.50586 \
                    c 146.03686,358.77148 255.57618,65.2968 256.26646,43.32661 89.38111,\
                    -17.52646 54.50558,-68.2132 -21.11411,-167.82075 -75.40645,36.35243 \
                    -149.30125,28.62724 -55.15235,-66.93555 23.23905,26.83347 \
                    134.81316,44.7649 148.56138,62.87429 \
                    C 623.3379,278.01503 621.09854,177.65128 440,83.791016 \
                    Z M 460,175.21875 342.85742,249.50586 265.71484,378.07617 360,183.79102 Z';

var creature2path = 'M 440,83.791016 \
                C 93.530091,333.12807 23.501708,122.57355 200,383.79102 30.811952,236.81524 \
                -33.834175,261.86453 205.71484,449.50586 c 116.05756,113.4333 255.93274,11.0534\
                 256.26646,43.32661 89.38111,-17.52646 200.71101,-3.23301 125.09132,-102.84056 \
                 99.17561,-95.36438 5.02671,0.19841 99.17561,-95.36438 \
                 C 701.36475,199.62314 743.8974,160.6969 607.37893,211.29638 460,175.21875 \
                 621.09854,177.65128 440,83.791016 Z M 460,175.21875 342.85742,249.50586 \
                 265.71484,378.07617 360,183.79102 Z';

var creaturestims = {
    "c1": 'm 141.77419,27.57098 -20.80644,82.74193 c -14.7589,20.35151 -36.042694,4.70424 -53.709685,18.38711 -26.352712,7.47877 -43.397852,-0.91936 -48.870968,23.70967 -0.370204,19.33897 -6.145863,25.18733 -11.6129035,42.09678 C 2.011431,215.59294 33.736059,160.80258 36.290323,149.02259 33.08218,178.99277 23.509873,219.87453 10.16129,245.31292 L 15,245.79679 l 21.774194,-2.41936 -1e-6,-27.58064 c 5.57127,-19.84333 1.896119,-27.61648 11.129033,-46.45162 l 9.193548,13.06452 c -2.106708,12.33714 -12.536394,12.14102 -4.354838,20.32258 5.490218,7.61824 0.933262,31.80678 5.806451,35.32258 l 4.354839,7.74194 28.548387,0 C 81.037042,231.08898 75.988716,213.05236 69.193548,196.44195 70.201247,166.2457 76.640547,167.2995 96.774194,153.8613 c 2.051992,30.65902 -8.138005,62.17282 -3.387097,90.48387 l 10.645163,0.48387 12.09677,0.48388 -17.419352,-23.22581 c 2.289642,-11.41175 4.521722,-22.79222 5.806452,-34.35484 l 7.74193,-24.19355 c 10.61167,8.51886 9.90541,13.7087 14.03226,22.74194 -2.27937,12.47105 -3.61868,29.37162 -10.64516,35.80645 0.79371,5.09849 -2.53426,7.10029 -5.80645,10.64516 l 29.51613,11.12904 8.2258,-11.61291 c 2.68249,-8.3022 1.87592,-14.05339 4.83872,-22.25807 0.30062,-11.97593 -14.78827,-27.12533 -17.90323,-33.38709 -5.06427,-9.95057 -11.51401,-19.08757 -14.03226,-30 6.64155,-13.36249 7.08651,-11.04608 2.90323,-24.19355 14.62625,-26.088849 17.22011,-14.10733 24.67741,-42.580646 11.84748,0.355948 17.03155,4.548333 27.09678,5.322581 -1.11555,-3.653078 -5.60213,-19.978481 -9.19355,-21.774194 -3.379,-6.629039 0.10503,-39.997775 -5.80645,-40.16129 l -6.29032,-7.258065 -3.3871,0 c -0.19486,12.180745 -0.77568,8.086852 -10.64516,3.387097 z',
    "c2": "m 113.2258,61.441948 4.83872,30.483866 C 103.30562,112.27732 84.925056,115.01715 67.258065,128.70002 40.905353,136.17879 32.56989,116.16776 27.096774,140.79679 26.72657,160.13576 18.531557,139.85508 13.064516,156.76453 8.3017536,177.851 33.736059,160.80258 36.290323,149.02259 33.08218,178.99277 23.509873,219.87453 10.16129,245.31292 L 15,245.79679 21.774194,235.15162 36.774193,215.79679 c 5.57127,-19.84333 1.896119,-27.61648 11.129033,-46.45162 l 9.193548,13.06452 c -2.106708,12.33714 -7.697685,32.4636 0.483871,40.64516 5.490218,7.61824 -3.905447,11.4842 0.967742,15 l 4.354839,7.74194 14.032258,0 c -10.414571,-14.70781 -0.946768,-32.74443 -7.741936,-49.35484 1.007699,-30.19625 7.446999,-29.14245 27.580646,-42.58065 2.051992,30.65902 -8.138005,62.17282 -3.387097,90.48387 l 10.645163,0.48387 12.09677,0.48388 -8.2258,-45.48387 c 2.28964,-11.41175 -4.67183,-0.53416 -3.3871,-12.09678 l 7.74193,-24.19355 c 10.61167,8.51886 9.90541,13.7087 14.03226,22.74194 -2.27937,12.47105 12.34906,36.62968 5.32258,43.06451 0.79371,5.09849 -0.59877,10.48739 -3.87096,14.03226 l 11.6129,0.48388 8.2258,-11.61291 c 2.68249,-8.3022 -1.51118,-11.63404 1.45162,-19.83872 0.30062,-11.97593 -11.40117,-29.54468 -14.51613,-35.80644 -5.06427,-9.95057 -11.51401,-19.08757 -14.03226,-30 6.64155,-13.36249 7.08651,-11.04608 2.90323,-24.19355 14.62625,-26.088849 17.22011,-14.10733 24.67741,-42.580646 11.84748,0.355948 24.28961,-6.096828 34.35484,-5.32258 -1.11555,-3.653078 -22.05374,-9.33332 -25.64516,-11.129033 -3.379,-6.629039 23.81471,-24.997775 17.90323,-25.16129 l -14.03226,0.483871 c -8.7122,-32.9209143 -14.83871,-8.548388 -19.83871,-15.483872 -0.19486,12.180745 3.57916,10.022336 -6.29032,5.322581 z",
    "c3": "M 54.677413,47.893561 53.709681,71.603233 C 38.950781,91.954739 50.086346,110.17844 32.419355,123.86131 20.306377,118.27755 20.096486,105.73972 16.873044,101.82545 12.536106,96.559051 6.388847,82.709462 8.2258058,146.60325 c -0.370204,19.33897 3.8709682,34.83871 14.0322592,39.19354 16.451613,2.41935 20.806452,-5.32258 20.806452,-5.32258 l 6.774193,-0.48388 7.258064,2.41936 c -2.106708,12.33714 -7.697685,32.4636 0.483871,40.64516 5.490218,7.61824 -3.905447,11.4842 0.967742,15 l -12.580645,8.22581 30.967742,-0.48387 c -10.414571,-14.70781 -0.946768,-32.74443 -7.741936,-49.35484 1.007699,-30.19625 -2.714292,-1.5618 17.419355,-15 2.051992,30.65902 2.023286,34.59217 6.774194,62.90322 l 10.645163,0.48387 12.09677,0.48388 -12.09677,-11.12903 c 2.28964,-11.41175 -0.80086,-34.889 0.48387,-46.45162 l 9.67741,-4.83871 15.00001,-18.38709 c 0,0 13.41575,-32.83525 1.93548,-47.41936 -2.25201,-9.65455 -15.79539,-18.471095 -16.93547,-10.1613 l -2.41937,6.29033 c 0,0 -6.6753,17.20276 -9.19355,6.29033 -8.842321,-4.65281 -17.107034,-0.88479 -21.290314,-14.03226 14.62625,-26.088853 59.316884,2.82815 66.774184,-25.645166 11.84748,0.355948 -42.96845,-14.322634 -32.90322,-13.548386 -1.11555,-3.653078 45.20432,-1.107514 41.6129,-2.903227 -3.379,-6.629039 -8.12077,-20.159065 -14.03225,-20.32258 L 125.80645,40.151625 C 117.09425,7.2307106 114.83871,30.151624 109.83871,23.21614 109.64385,35.396885 97.450126,29.851379 87.580646,25.151624 Z",
    "c4": "M 58.548381,37.732271 57.580649,61.441943 C 42.821749,81.793449 53.957314,100.01715 36.290323,113.70002 24.177345,108.11626 23.967454,95.57843 20.744012,91.66416 c -4.336938,-5.266399 -10.484197,-19.115988 -8.647238,44.7778 -0.370204,19.33897 -6.7741933,37.74194 3.387098,42.09677 16.451613,2.41935 20.322581,-37.74194 20.322581,-37.74194 l 17.903225,29.03225 7.258064,2.41936 c -2.106708,12.33714 -10.11704,10.68941 -1.935484,18.87097 5.490218,7.61824 0.449392,11.00033 5.322581,14.51613 l -11.129032,10.16129 25.16129,-2.41935 c -10.414571,-14.70781 1.472587,-10.48637 -5.322581,-27.09678 1.007699,-30.19625 -2.714292,-1.5618 17.419355,-15 2.051992,30.65902 -1.363811,14.75346 3.387097,43.06451 l 10.645162,0.48387 12.09677,0.48388 -12.09677,-11.12903 c 2.28964,-11.41175 2.58624,-15.05029 3.87097,-26.61291 l 11.61289,-35.32258 20.3226,29.03226 c 0,0 9.54478,-49.77073 -1.93549,-64.35484 -2.25201,-9.65455 -10.47281,-26.21303 -11.61289,-17.903235 l -3.38711,14.032265 c 0,0 -14.41724,17.20276 -16.93549,6.29033 -8.842323,-4.65281 -17.107036,-0.88479 -21.290316,-14.03226 14.62625,-26.088853 6.574948,1.37654 14.032249,-27.096779 11.847487,0.355948 13.644457,-5.612956 23.709687,-4.838708 5.17477,-0.265982 -15.76342,-6.913966 -19.35485,-8.709679 -3.379,-6.629039 0.10504,-8.062291 -5.80644,-8.225806 l 31.93548,-16.451613 c -8.7122,-32.9209147 -27.41936,4.999999 -32.419355,-1.935485 -0.19486,12.180745 4.063025,-8.364761 -5.806451,-13.064516 z",
    "c5": "M 58.548381,37.732271 57.580649,61.441943 C 42.821749,81.793449 53.957314,100.01715 36.290323,113.70002 24.177345,108.11626 23.967454,95.57843 20.744012,91.66416 c -4.336938,-5.266399 6.900521,29.91221 6.900521,29.91221 l 3.870969,9.19355 4.290951,10.02687 17.903225,29.03225 7.258064,2.41936 c -2.106708,12.33714 -10.11704,10.68941 -1.935484,18.87097 5.490218,7.61824 0.449392,11.00033 5.322581,14.51613 l -11.129032,10.16129 25.16129,-2.41935 c -10.414571,-14.70781 1.472587,-10.48637 -5.322581,-27.09678 1.007699,-30.19625 -2.714292,-1.5618 17.419355,-15 2.051992,30.65902 -1.363811,14.75346 3.387097,43.06451 l 10.645162,0.48387 12.09677,0.48388 -12.09677,-11.12903 c 2.28964,-11.41175 2.58624,-15.05029 3.87097,-26.61291 l -9.193562,-14.03226 7.258092,-27.58064 c 0,0 4.24709,-55.373218 3.3871,-50.806463 L 91.935487,117.08711 77.903229,96.764533 c 0,0 -6.489568,9.118477 0.967733,-19.354844 11.847487,0.355948 32.515428,9.870915 44.032268,-2.903224 5.17477,-0.265982 -15.27955,0.82797 -18.87098,-0.967743 -3.379,-6.629039 8.81472,-4.191323 2.90324,-4.354838 24.81003,-6.996053 9.83871,-15.322581 19.35483,-11.612904 -8.7122,-32.920915 -24.51613,-15.322581 -29.516126,-22.258065 -0.19486,12.180745 4.546896,-15.622826 -5.32258,-20.322581 z",
    "c6": "m 14.516123,50.796787 c 0,0 23.368397,13.120914 27.096784,26.612898 C 45.341294,90.901669 42.939112,121.65635 30,121.92583 17.060889,122.1953 23.967454,95.57843 20.744012,91.66416 c -4.336938,-5.266399 -1.809156,39.58963 -1.809156,39.58963 l 22.258065,-2.41935 0.903855,28.89783 11.612902,12.09677 7.258064,2.41936 c -2.106708,12.33714 -10.11704,10.68941 -1.935484,18.87097 5.490218,7.61824 0.449392,11.00033 5.322581,14.51613 l -11.129032,10.16129 25.16129,-2.41935 c -10.414571,-14.70781 1.472587,-10.48637 -5.322581,-27.09678 1.007699,-30.19625 -2.714292,-1.5618 17.419355,-15 2.051992,30.65902 -1.363811,14.75346 3.387097,43.06451 l 10.645162,0.48387 12.09677,0.48388 -12.09677,-11.12903 c 2.28964,-11.41175 2.58624,-15.05029 3.87097,-26.61291 l -15.483885,-48.3871 13.548415,6.7742 c 0,0 4.24709,-55.373218 3.3871,-50.806463 0,0 -6.62563,32.646853 -17.419372,32.903233 -10.79374,0.25638 -20.322581,-10.16128 -20.322581,-10.16128 L 63.870962,79.829044 65.806455,65.796788 80.322573,57.087109 c 0,0 7.363105,-12.901001 1.451625,-13.064516 C 106.58423,37.02654 117.58064,29.506464 117.58064,29.506464 L 31.451613,23.700012 9.1935495,29.506463 Z",
    "c7": "m 43.548381,76.441948 c 5.035013,2.672234 3.529687,1.991882 7.258074,15.483866 3.728387,13.491986 -11.25444,32.633766 -24.193552,32.903246 -12.861103,0.77653 -36.651594,73.1376 -10.707601,32.64155 -0.661681,-0.85223 23.248505,25.7387 9.803748,-3.47488 5.72013,-6.24095 6.069167,-27.66776 15.483871,-25.16129 9.414704,2.50647 6.212814,16.16401 11.549016,21.63977 5.336202,5.47576 3.265568,5.19626 6.290322,8.2258 3.024754,3.02954 0.48387,8.70968 0.48387,8.70968 -2.106708,12.33714 -9.633169,8.75393 -1.451613,16.93549 5.490218,7.61824 -7.292543,21.16162 -2.419354,24.67742 l -17.419355,9.19354 37.741935,-0.96773 c -10.414571,-14.70781 2.440329,-2.26057 -4.354839,-18.87098 1.007699,-30.19625 2.608289,-3.98115 22.741936,-17.41935 2.051992,30.65902 -5.71865,8.46314 -0.967742,36.77419 l 11.129033,0.48387 27.09677,0 c 23.51901,-3.70967 -23.06451,-10.32257 -27.09677,-14.03225 2.28964,-11.41175 2.58624,-15.05029 3.87097,-26.61291 0,0 -25.981965,-43.19634 -15.483885,-48.3871 10.498085,-5.19076 21.250515,31.17083 28.064545,36.29033 6.58044,5.93309 -12.49252,-20.13946 13.06452,-10.1613 -0.42999,2.28338 -30.81918,-37.51444 -41.612922,-37.25806 -10.793741,0.25638 -20.322581,-10.16128 -20.322581,-10.16128 0,0 -3.050268,-20.021805 0.483862,-29.032268 2.293843,-5.848282 12.040104,-7.773508 12.580655,-14.032256 0.26186,-3.031935 -4.162811,-4.774725 -4.838721,-7.741937 -0.973176,-4.272199 4.427376,-9.84836 1.451625,-13.064516 C 68.512748,29.689778 39.446037,35.086113 23.225801,45.958077 17.349054,49.897094 17.438451,58.86993 14.516129,65.312915 11.952217,70.965696 3.0211771,77.30447 6.7741947,82.248399 14.277694,92.132916 32.586624,70.624211 43.548381,76.441948 Z",
    "c8": "m 26.511383,99.66775 c 9.717939,1.93762 23.972263,-10.413376 31.650939,-1.114133 7.678674,9.299253 -18.610307,26.005963 -31.549419,26.275443 -12.861103,0.77653 -36.651594,73.1376 -10.707601,32.64155 -2.597165,-4.23933 18.409795,22.3516 4.965038,-6.86198 5.72013,-6.24095 2.682071,-19.44195 12.096775,-16.93548 9.414704,2.50647 14.43862,11.3253 19.774822,16.80106 5.336202,5.47576 3.265568,5.19626 6.290322,8.2258 3.024754,3.02954 0.48387,8.70968 0.48387,8.70968 -2.106708,12.33714 -9.633169,8.75393 -1.451613,16.93549 5.490218,7.61824 -7.292543,21.16162 -2.419354,24.67742 2.265751,3.2258 0.795006,6.45161 -3.387097,9.67741 l 23.709677,-1.4516 c -10.414571,-14.70781 2.440329,-2.26057 -4.354839,-18.87098 1.007699,-30.19625 2.608289,-3.98115 22.741936,-17.41935 2.051992,30.65902 -5.71865,8.46314 -0.967742,36.77419 l 11.129033,0.48387 8.70967,0.96774 c 23.51901,-3.70967 -4.67741,-11.29031 -8.70967,-14.99999 2.28964,-11.41175 2.58624,-15.05029 3.87097,-26.61291 0,0 -25.981965,-43.19634 -15.483885,-48.3871 10.498085,-5.19076 21.250515,31.17083 28.064545,36.29033 6.58044,5.93309 -12.49252,-20.13946 13.06452,-10.1613 -0.42999,2.28338 -30.81918,-37.51444 -41.612922,-37.25806 -10.793741,0.25638 -20.322581,-10.16128 -20.322581,-10.16128 0,0 0.758939,0.81293 4.910384,-5.652 C 96.056719,79.85416 105.33184,80.779672 93.742407,78.410404 78.164551,68.126731 111.80434,40.68947 78.398489,48.182886 71.015912,41.456459 61.922917,53.465787 55.904345,57.906562 50.623926,61.802698 9.6899535,79.46556 17.419356,82.873123 c 3.5452,1.562928 28.258413,-1.207867 27.209576,1.847744 -3.52306,10.263849 -34.420919,11.696237 -18.117549,14.946883 z"
};



var colors = {
    "green":"#85E085",
    "blue":"#80A8E6",
    "orange":"#FF9900",
    "red":"#FF0000",
    "yellow":"#FFFF00",
    "purple":"#CC33FF",
    "brown":"#996633",
    "black":"#000000"
}

var categories = ['fish','flower','bird','bug']

var animalColorParts = {
    "flower":[["stems","col1"],["petals","col3"]],
    "fish": [["bodies","col1"],["fins","col2"]],
    "bug":[["legs","col1"],["heads","col2"]],
    "bird": [["bodies","col2"],["wings","col3"]]
};


var prevalences = [0, 0.33, 0.66, 1];


var animalNames = 
    [{list:0,category: "morseths"},
    {list:1, category: "ollers"},
    {list:2, category: "kweps"},
    {list:0,category: "blins"},
    {list:1, category: "reesles"},
    {list:2, category: "dorbs"},
    {list:0,category: "zorbs"},
    {list:1, category: "taifels"},
    {list:2, category: "trufts"},
    {list:0,category: "daiths"},
    {list:1, category: "mooks"},
    {list:2, category: "frams"},
    {list:0,category: "moxes"},
    {list:1, category: "luzaks"},
    {list:2, category: "javs"},
    {list:0,category: "ludinos"},
    {list:1, category: "ackles"},
    {list:2, category: "feps"},
    {list:0,category: "cheebas"},
    {list:1, category: "elleps"},
    {list:2, category: "kazzes"},
    {list:0,category: "lorches"},
    {list:1, category: "plovs"},
    {list:2, category: "noobs"},
    {list:0,category: "glippets"},
    {list:1, category: "sapers"},
    {list:2, category: "stups"},
    {list:0,category: "krivels"},
    {list:1, category: "zoovs"},
    {list:2, category: "thups"},
    {list:3, category: "crullets"},
    {list:3, category: "feps"}]


var generateOrigins = {
    intrinsic: function(kind, feature, proptype){
        return proptype == "color" ?  "Here is how they grew. They grew up with " + feature + 
               " skin.<br> First they were born, then they got bigger, then they were full size." : 
         "Here is how they grew. They grew up with " + feature + 
               ".<br> First they were born, then they got bigger, then they were full size."
    },
    extrinsic: function(kind, feature, proptype){
        return proptype == "color" ? "Here is what they did. They found some "+feature+" paint and painted themselves " + feature + 
                            ".<br>First they looked like this on the left, then they found the paint, and then they looked like this on the right." : 
                "Here is what they did. They found some "+feature+" and put on " + feature + 
                    ".<br>First they looked like this on the left, then they found "+feature+", and when they came back, they looked like this on the right."
    }
}

var eventOutcomes = {
    maintained: "Then one day they drank a yummy drink. <br>They got very full and happy, and this is how they looked.",
    lost: "Then one day they drank a bad chemical.<br> They got very sick, and this is how they looked."
}


var propertySizes = _.map([[0,0],[0,0.5],[0,1],[0.5,0],[0.5,1],[1,0],[1,0.5],[1,1]],
    function(x){return {prop1size: x[0], prop2size: x[1]}});
// var propertySizes = [[1,1]];
var propertytestSizes = [[0,0.5],[1,0]];
var testcolors = {
    "green":"#85E085",
    "blue":"#80A8E6"
}
var testprevlev = [{"prevalence":0.33},
                          {"prevalence":0.66}];

var testpropertyObj = [
{"kind":"fish","property":"tar2","propertyName":"whiskers"},
{"kind":"bird","property":"tar2","propertyName":"crests"}
];


var testanimalNames = 
    [{list:0,category: "morseths"},
    {list:1, category: "ollers"},
    {list:2, category: "kweps"},

    {list:0,category: "blins"},
    {list:1, category: "reesles"},
    {list:2, category: "dorbs"},

    {list:0,category: "zorbs"},
    {list:1, category: "taifels"}]
      




// var animalParts = {

// }

// var cells = ['foo','bar','moo','zonk'];
// var papers = cells.map(function(x){return Raphael(x,300,300)});

// var morphs = [0,0.3,0.7,1]

// var creaturepaths = morphs.map(function(morph){return intermediate(creaturepath,creature2path,morph)});

// var zipped = zip([papers,creaturepaths]);


// var creatures = zipped.map(function(papercreature)
// 	{return papercreature[0].path(papercreature[1])});


// creatures.map(function(creature){creature.attr("fill","#f00"); creature.transform("s0.2t-800,-400")});
