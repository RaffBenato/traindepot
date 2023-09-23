document.addEventListener("DOMContentLoaded", function () {
  const zoomInButton = document.getElementById("zoom-in");
  const zoomOutButton = document.getElementById("zoom-out");
  const zoomWholeButton = document.getElementById("zoom-whole");
  const zoomFindButton = document.getElementById("zoom-find");
  const findModal = document.querySelector(".find-modal");
  const findInput = document.querySelector(".find-input");
  const findButton = document.getElementById("find-btn");
  const lockButton = document.getElementById("lock");
  const unlockButton = document.getElementById("unlock");

  //Zooming variables
  const initialScale = 0.12;
  const minScale = 0.06894334949441323;
  const maxScale = 1.2;
  // Panning variables
  let isDragging = false;
  let lastPosition = { x: 0, y: 0 };

  //WAGONS
  locos = [
    "L15",
    "L16",
    "L17",
    "L18",
    "L19",
    "L20",
    "L21",
    "L22",
    "L23",
    "L24",
    "L25",
    "L26",
    "L27",
    "L28",
    "L29",
    "L30",
    "L31",
    "L32",
    "L44",
    "L45",
    "L46",
    "L47",
    "L48",
    "L49",
    "L50",
    "L51",
    "L52",
    "L53",
    "L54",
  ];

  rws = ["1053", "1054", "1055"];

  gps = [
    "901",
    "902",
    "903",
    "904",
    "905",
    "906",
    "907",
    "908",
    "909",
    "910",
    "911",
    "913",
    "914",
    "915",
    "916",
    "917",
    "918",
    "919",
    "920",
    "921",
    "922",
    "924",
    "925",
    "926",
    "927",
    "928",
    "929",
    "930",
    "931",
    "933",
    "934",
    "935",
    "936",
    "937",
    "938",
    "939",
    "940",
  ];

  //Roads
  const roadColour = "rgb(180,180,180)";

  const stage = new Konva.Stage({
    height: window.innerHeight,
    width: window.innerWidth,
    container: "konva-holder",
  });

  //LAYERS
  const layer = new Konva.Layer();
  const tracksLayer = new Konva.Layer();
  const outOfTrackLayer = new Konva.Layer();
  const roadNumbers = new Konva.Layer();
  stage.add(outOfTrackLayer, tracksLayer, roadNumbers, layer);

  const outOfTrackRectangle = new Konva.Rect({
    x: 500,
    y: 7250,
    fill: "rgba(0,0,180,0.5)",
    height: 2050,
    width: 20500,
    stroke: "darkblue",
    strokeWidth: 25,
    cornerRadius: 50,
    name: "OutOfTrack",
  });
  outOfTrackLayer.add(outOfTrackRectangle);
  tracksLayer.batchDraw();

  //ROADS
  const roadEastBound = new Konva.Rect({
    x: 100,
    y: 85,
    fill: roadColour,
    height: 50,
    width: 23500,
    name: "EastBound",
  });
  const stopEastboundWest = new Konva.Rect({
    x: 100,
    y: 75,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopEastboundEast = new Konva.Rect({
    x: 23600,
    y: 75,
    fill: "red",
    height: 72,
    width: 10,
  });
  const roadWestBound = new Konva.Rect({
    x: 100,
    y: 250,
    fill: roadColour,
    height: 50,
    width: 23500,
    name: "WestBound",
  });
  const stopWestboundWest = new Konva.Rect({
    x: 100,
    y: 240,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopWestboundEast = new Konva.Rect({
    x: 23600,
    y: 240,
    fill: "red",
    height: 72,
    width: 10,
  });
  const westRuislip = new Konva.Rect({
    x: 610,
    y: 135,
    fill: "black",
    height: 114,
    width: 970,
  });
  const westRuislipText = new Konva.Text({
    x: 620,
    y: 155,
    text: `WEST RUISLIP`,
    fontSize: 90,
    fontFamily: "Calibri",
    fill: "white",
    width: 900,
    align: "center",
  });
  const ruislipGardens = new Konva.Rect({
    x: 22130,
    y: 135,
    fill: "black",
    height: 114,
    width: 1270,
  });
  const ruislipGardensText = new Konva.Text({
    x: 22230,
    y: 155,
    text: `RUISLIP GARDENS`,
    fontSize: 90,
    fontFamily: "Calibri",
    fill: "white",
    width: 900,
    align: "center",
  });
  const road23 = new Konva.Rect({
    x: 100,
    y: 415,
    fill: roadColour,
    height: 50,
    width: 6260,
    name: "23Road",
  });
  const stopRoad23West = new Konva.Rect({
    x: 100,
    y: 405,
    fill: "red",
    height: 70,
    width: 10,
  });
  const pointsRoad23 = new Konva.Rect({
    x: 2910,
    y: 465,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 336,
  });
  const pointsWestbound = new Konva.Rect({
    x: 2240,
    y: 300,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 336,
  });
  const pointsWestbound2 = new Konva.Rect({
    x: 3490,
    y: 132,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 336,
  });
  const pointsRoad232 = new Konva.Rect({
    x: 3310,
    y: 630,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 336,
  });
  const road25 = new Konva.Rect({
    x: 1400,
    y: 580,
    fill: roadColour,
    height: 50,
    width: 1950,
    name: "25Road",
  });
  const stopRoad25West = new Konva.Rect({
    x: 1400,
    y: 570,
    fill: "red",
    height: 70,
    width: 10,
  });
  const pointsRoad233 = new Konva.Rect({
    x: 3890,
    y: 300,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 336,
  });
  const pointsWestbound3 = new Konva.Rect({
    x: 4250,
    y: 132,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 336,
  });
  const wash = new Konva.Rect({
    x: 4850,
    y: 555,
    fill: "blue",
    height: 100,
    width: 434,
    name: "Wash",
  });
  const washText = new Konva.Text({
    x: 4620,
    y: 572,
    text: `WASH PLANT`,
    fontSize: 70,
    fontFamily: "Calibri",
    fill: "white",
    width: 900,
    align: "center",
  });
  const road26 = new Konva.Rect({
    x: 3350,
    y: 580,
    fill: roadColour,
    height: 50,
    width: 2885,
    name: "26Road",
  });
  const road30 = new Konva.Rect({
    x: 100,
    y: 905,
    fill: roadColour,
    height: 50,
    width: 4100,
    name: "30Road",
  });
  const stopRoad30East = new Konva.Rect({
    x: 4200,
    y: 895,
    fill: "red",
    height: 72,
    width: 10,
  });
  const pointsRoad30 = new Konva.Rect({
    x: 4000,
    y: 1120,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 336,
  });
  const road27 = new Konva.Rect({
    x: 3350,
    y: 1070,
    fill: roadColour,
    height: 50,
    width: 4352,
    name: "27Road",
  });
  const stopRoad27West = new Konva.Rect({
    x: 3350,
    y: 1060,
    fill: "red",
    height: 70,
    width: 10,
  });
  const road31 = new Konva.Rect({
    x: 9000,
    y: 415,
    fill: roadColour,
    height: 50,
    width: 6836,
    name: "31Road",
  });
  const road32 = new Konva.Rect({
    x: 8730,
    y: 580,
    fill: roadColour,
    height: 50,
    width: 12298,
    name: "32Road",
  });
  const road33 = new Konva.Rect({
    x: 8430,
    y: 745,
    fill: roadColour,
    height: 50,
    width: 7150,
    name: "33Road",
  });
  const road34 = new Konva.Rect({
    x: 7200,
    y: 910,
    fill: roadColour,
    height: 50,
    width: 8100,
    name: "34Road",
  });
  const pointsRoad31 = new Konva.Rect({
    x: 9024,
    y: 460,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 336,
  });
  const pointsRoad32 = new Konva.Rect({
    x: 8740,
    y: 625,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 336,
  });
  const pointsRoad33 = new Konva.Rect({
    x: 8455,
    y: 790,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 336,
  });
  const road24 = new Konva.Rect({
    x: 7199,
    y: 958,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 1000,
    name: "24Road",
  });
  const pointsRoad26 = new Konva.Rect({
    x: 7074,
    y: 1121,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 996,
  });
  const pointsRoad27 = new Konva.Rect({
    x: 7574,
    y: 1121,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 336,
  });
  const pointsRoad271 = new Konva.Rect({
    x: 7592,
    y: 954,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 330,
  });
  const pointsRoad272 = new Konva.Rect({
    x: 8850,
    y: 2444,
    rotation: -125,
    fill: roadColour,
    height: 50,
    width: 1810,
  });
  const pointsRoad273 = new Konva.Rect({
    x: 7977,
    y: 1289,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 345,
  });
  const road35 = new Konva.Rect({
    x: 8675,
    y: 1075,
    fill: roadColour,
    height: 50,
    width: 13600,
    name: "35Road",
  });
  const road36 = new Konva.Rect({
    x: 7975,
    y: 1240,
    fill: roadColour,
    height: 50,
    width: 7600,
    name: "36Road",
  });
  const road37 = new Konva.Rect({
    x: 8500,
    y: 1405,
    fill: roadColour,
    height: 50,
    width: 6800,
    name: "37Road",
  });
  const pointsRoad37 = new Konva.Rect({
    x: 8500,
    y: 1454,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const pointsRoad35 = new Konva.Rect({
    x: 8700,
    y: 1119,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 330,
  });
  const road38 = new Konva.Rect({
    x: 8280,
    y: 1570,
    fill: roadColour,
    height: 50,
    width: 4373,
    name: "38Road",
  });
  const road39 = new Konva.Rect({
    x: 8800,
    y: 1735,
    fill: roadColour,
    height: 50,
    width: 3700,
    name: "39Road",
  });
  const stopRoad39East = new Konva.Rect({
    x: 12500,
    y: 1725,
    fill: "red",
    height: 72,
    width: 10,
  });
  const road40 = new Konva.Rect({
    x: 8530,
    y: 1900,
    fill: roadColour,
    height: 50,
    width: 3650,
    name: "40Road",
  });
  const road41 = new Konva.Rect({
    x: 8980,
    y: 2065,
    fill: roadColour,
    height: 50,
    width: 7447,
    name: "41Road",
  });
  const road42 = new Konva.Rect({
    x: 8750,
    y: 2230,
    fill: roadColour,
    height: 50,
    width: 3180,
    name: "42Road",
  });
  const road43 = new Konva.Rect({
    x: 8850,
    y: 2395,
    fill: roadColour,
    height: 50,
    width: 4770,
    name: "43Road",
  });
  const pointsRoad38 = new Konva.Rect({
    x: 8800,
    y: 1784,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const pointsRoad40 = new Konva.Rect({
    x: 8980,
    y: 2114,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const pointsRoad274 = new Konva.Rect({
    x: 7670,
    y: 1090,
    rotation: 56,
    fill: roadColour,
    height: 50,
    width: 3390,
  });
  const road44 = new Konva.Rect({
    x: 8650,
    y: 2560,
    fill: roadColour,
    height: 50,
    width: 9060,
    name: "44Road",
  });
  const road45 = new Konva.Rect({
    x: 9540,
    y: 2725,
    fill: roadColour,
    height: 50,
    width: 3180,
    name: "45Road",
  });
  const stopRoad45East = new Konva.Rect({
    x: 12710,
    y: 2715,
    fill: "red",
    height: 72,
    width: 10,
  });
  const road46 = new Konva.Rect({
    x: 9450,
    y: 2890,
    fill: roadColour,
    height: 50,
    width: 3180,
    name: "46Road",
  });
  const road47 = new Konva.Rect({
    x: 9540,
    y: 3055,
    fill: roadColour,
    height: 50,
    width: 3920,
    name: "47Road",
  });
  const road48 = new Konva.Rect({
    x: 9375,
    y: 3220,
    fill: roadColour,
    height: 50,
    width: 3463,
    name: "48Road",
  });
  const road49 = new Konva.Rect({
    x: 9490,
    y: 3385,
    fill: roadColour,
    height: 50,
    width: 3480,
    name: "49Road",
  });
  const road50 = new Konva.Rect({
    x: 9300,
    y: 3550,
    fill: roadColour,
    height: 50,
    width: 3540,
    name: "50Road",
  });
  const road51 = new Konva.Rect({
    x: 9780,
    y: 3715,
    fill: roadColour,
    height: 50,
    width: 3130,
    name: "51Road",
  });
  const road52 = new Konva.Rect({
    x: 9525,
    y: 3880,
    fill: roadColour,
    height: 50,
    width: 3250,
    name: "52Road",
  });
  const pointsRoad50 = new Konva.Rect({
    x: 9780,
    y: 3764,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const pointsRoad275 = new Konva.Rect({
    x: 9490,
    y: 3434,
    rotation: -125,
    fill: roadColour,
    height: 50,
    width: 1020,
  });
  const pointsRoad276 = new Konva.Rect({
    x: 9540,
    y: 3104,
    rotation: -125,
    fill: roadColour,
    height: 50,
    width: 610,
  });
  const pointsRoad277 = new Konva.Rect({
    x: 9540,
    y: 2774,
    rotation: -125,
    fill: roadColour,
    height: 50,
    width: 200,
  });
  const road53 = new Konva.Rect({
    x: 11005,
    y: 4045,
    fill: roadColour,
    height: 50,
    width: 1632,
    name: "53Road",
  });
  const roadBank = new Konva.Rect({
    x: 7400,
    y: 2230,
    rotation: 56,
    fill: roadColour,
    height: 50,
    width: 2612,
    name: "BankRoad",
  });
  const road54 = new Konva.Rect({
    x: 8820,
    y: 4375,
    fill: roadColour,
    height: 50,
    width: 7370,
    name: "54Road",
  });
  const roadA = new Konva.Rect({
    x: 4580,
    y: 3715,
    fill: roadColour,
    height: 50,
    width: 3800,
    name: "ARoad",
  });
  const stopRoadAWest = new Konva.Rect({
    x: 4580,
    y: 3705,
    fill: "red",
    height: 70,
    width: 10,
  });
  const roadB = new Konva.Rect({
    x: 4580,
    y: 3550,
    fill: roadColour,
    height: 50,
    width: 3100,
    name: "BRoad",
  });
  const stopRoadBWest = new Konva.Rect({
    x: 4580,
    y: 3540,
    fill: "red",
    height: 70,
    width: 10,
  });
  const pointsRoadA = new Konva.Rect({
    x: 7950,
    y: 3764,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const roadB1 = new Konva.Rect({
    x: 4580,
    y: 3385,
    fill: roadColour,
    height: 50,
    width: 2100,
    name: "B1Road",
  });
  const stopRoadB1West = new Konva.Rect({
    x: 4580,
    y: 3375,
    fill: "red",
    height: 70,
    width: 10,
  });
  const roadB2 = new Konva.Rect({
    x: 4580,
    y: 3220,
    fill: roadColour,
    height: 50,
    width: 2600,
    name: "B2Road",
  });
  const stopRoadB2West = new Konva.Rect({
    x: 4580,
    y: 3210,
    fill: "red",
    height: 70,
    width: 10,
  });
  const roadC = new Konva.Rect({
    x: 4580,
    y: 3055,
    fill: roadColour,
    height: 50,
    width: 3350,
    name: "CRoad",
  });
  const stopRoadCWest = new Konva.Rect({
    x: 4580,
    y: 3045,
    fill: "red",
    height: 70,
    width: 10,
  });
  const pointsRoadB1 = new Konva.Rect({
    x: 6975,
    y: 3265,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const pointsRoadB2 = new Konva.Rect({
    x: 7475,
    y: 3100,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const roadD = new Konva.Rect({
    x: 5520,
    y: 2890,
    fill: roadColour,
    height: 50,
    width: 2300,
    name: "DRoad",
  });
  const stopRoadDWest = new Konva.Rect({
    x: 5520,
    y: 2880,
    fill: "red",
    height: 70,
    width: 10,
  });
  const pointsRoadBank = new Konva.Rect({
    x: 8499,
    y: 2400,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 841,
  });
  const roadE = new Konva.Rect({
    x: 4580,
    y: 2725,
    fill: roadColour,
    height: 50,
    width: 2500,
    name: "ERoad",
  });
  const stopRoadEWest = new Konva.Rect({
    x: 4580,
    y: 2715,
    fill: "red",
    height: 70,
    width: 10,
  });
  const roadF = new Konva.Rect({
    x: 4580,
    y: 2560,
    fill: roadColour,
    height: 50,
    width: 3040,
    name: "FRoad",
  });
  const stopRoadFWest = new Konva.Rect({
    x: 4580,
    y: 2550,
    fill: "red",
    height: 70,
    width: 10,
  });
  const pointsRoadE = new Konva.Rect({
    x: 7375,
    y: 2605,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const roadG = new Konva.Rect({
    x: 4580,
    y: 2395,
    fill: roadColour,
    height: 50,
    width: 2340,
    name: "GRoad",
  });
  const stopRoadGWest = new Konva.Rect({
    x: 4580,
    y: 2385,
    fill: "red",
    height: 70,
    width: 10,
  });
  const roadH = new Konva.Rect({
    x: 4580,
    y: 2230,
    fill: roadColour,
    height: 50,
    width: 2819,
    name: "HRoad",
  });
  const stopRoadHWest = new Konva.Rect({
    x: 4580,
    y: 2220,
    fill: "red",
    height: 70,
    width: 10,
  });
  const pointsRoadG = new Konva.Rect({
    x: 7215,
    y: 2275,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const pointsRoad311 = new Konva.Rect({
    x: 16102,
    y: 626,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 336,
  });
  const pointsEastbound = new Konva.Rect({
    x: 20590,
    y: 132,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 997,
  });
  const pointsRoad34 = new Konva.Rect({
    x: 15877,
    y: 627,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 666,
  });
  const pointsRoad372 = new Konva.Rect({
    x: 15877,
    y: 1122,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 666,
  });
  const pointsRoad302 = new Konva.Rect({
    x: 17677,
    y: 627,
    rotation: 130,
    fill: roadColour,
    height: 50,
    width: 1943,
  });
  const pointsRoad8 = new Konva.Rect({
    x: 12947,
    y: 1452,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 338,
  });
  const pointsRoad402 = new Konva.Rect({
    x: 12450,
    y: 2114,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const pointsRoad373 = new Konva.Rect({
    x: 13650,
    y: 2114,
    rotation: -130,
    fill: roadColour,
    height: 50,
    width: 881,
  });
  const pointsRoad42 = new Konva.Rect({
    x: 12200,
    y: 2444,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 343,
  });
  const pointsRoad43 = new Konva.Rect({
    x: 13900,
    y: 2114,
    rotation: 130,
    fill: roadColour,
    height: 50,
    width: 433,
  });
  const pointsRoad431 = new Konva.Rect({
    x: 14700,
    y: 2114,
    rotation: 130,
    fill: roadColour,
    height: 50,
    width: 640,
  });
  const pointsRoad432 = new Konva.Rect({
    x: 15900,
    y: 2594,
    rotation: -130,
    fill: roadColour,
    height: 50,
    width: 640,
  });
  const pointsRoad46 = new Konva.Rect({
    x: 12900,
    y: 3104,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 343,
  });
  const pointsRoad48 = new Konva.Rect({
    x: 12800,
    y: 3239,
    rotation: 1030,
    fill: roadColour,
    height: 50,
    width: 233,
  });
  const pointsRoad502 = new Konva.Rect({
    x: 12800,
    y: 3569,
    rotation: 1030,
    fill: roadColour,
    height: 50,
    width: 663,
  });
  const road73 = new Konva.Rect({
    x: 13725,
    y: 2725,
    fill: roadColour,
    height: 50,
    width: 3844,
    name: "73Road",
  });
  const road74 = new Konva.Rect({
    x: 14075,
    y: 2890,
    fill: roadColour,
    height: 50,
    width: 2180,
    name: "74Road",
  });
  const road75 = new Konva.Rect({
    x: 14195,
    y: 3055,
    fill: roadColour,
    height: 50,
    width: 2275,
    name: "75Road",
  });
  const pointsRoad53 = new Konva.Rect({
    x: 12600,
    y: 4064,
    rotation: 1030,
    fill: roadColour,
    height: 50,
    width: 1948,
  });
  const stopRoad53West = new Konva.Rect({
    x: 11005,
    y: 4035,
    fill: "red",
    height: 70,
    width: 10,
  });
  const road64 = new Konva.Rect({
    x: 13670,
    y: 3220,
    fill: roadColour,
    height: 50,
    width: 3500,
    name: "64Road",
  });
  const road65 = new Konva.Rect({
    x: 13670,
    y: 3385,
    fill: roadColour,
    height: 50,
    width: 3360,
    name: "65Road",
  });
  const road66 = new Konva.Rect({
    x: 13670,
    y: 3550,
    fill: roadColour,
    height: 50,
    width: 3200,
    name: "66Road",
  });
  const road67 = new Konva.Rect({
    x: 13670,
    y: 3715,
    fill: roadColour,
    height: 50,
    width: 3070,
    name: "67Road",
  });
  const road68 = new Konva.Rect({
    x: 13670,
    y: 3880,
    fill: roadColour,
    height: 50,
    width: 2370,
    name: "68Road",
  });
  const road69 = new Konva.Rect({
    x: 13670,
    y: 4045,
    fill: roadColour,
    height: 50,
    width: 2100,
    name: "69Road",
  });
  const road70spur = new Konva.Rect({
    x: 15725,
    y: 4210,
    fill: roadColour,
    height: 50,
    width: 600,
    name: "70Spur",
  });
  const road70 = new Konva.Rect({
    x: 18977,
    y: 1122,
    rotation: 130,
    fill: roadColour,
    height: 50,
    width: 6251,
    name: "70Road",
  });
  const pointsRoad69 = new Konva.Rect({
    x: 16348,
    y: 3762,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 666,
  });
  const stopRoad64 = new Konva.Rect({
    x: 13670,
    y: 3210,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopRoad65 = new Konva.Rect({
    x: 13670,
    y: 3375,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopRoad66 = new Konva.Rect({
    x: 13670,
    y: 3540,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopRoad67 = new Konva.Rect({
    x: 13670,
    y: 3705,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopRoad68 = new Konva.Rect({
    x: 13670,
    y: 3870,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopRoad69 = new Konva.Rect({
    x: 13670,
    y: 4035,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopRoad70Spur = new Konva.Rect({
    x: 15725,
    y: 4200,
    fill: "red",
    height: 70,
    width: 10,
  });
  const pointsRoad73 = new Konva.Rect({
    x: 14195,
    y: 3105,
    rotation: -130,
    fill: roadColour,
    height: 50,
    width: 446,
  });
  const pointsRoad75 = new Konva.Rect({
    x: 17048,
    y: 2772,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 666,
  });
  const pointsRoad74 = new Konva.Rect({
    x: 16548,
    y: 2772,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 337,
  });
  const road55 = new Konva.Rect({
    x: 9520,
    y: 4540,
    fill: roadColour,
    height: 50,
    width: 2300,
    name: "55Road",
  });
  const pointsRoad55 = new Konva.Rect({
    x: 9520,
    y: 4589,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const pointsRoad552 = new Konva.Rect({
    x: 12108,
    y: 4424,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 332,
  });
  const road57 = new Konva.Rect({
    x: 8820,
    y: 4870,
    fill: roadColour,
    height: 50,
    width: 6950,
    name: "57Road",
  });
  const stopRoad57 = new Konva.Rect({
    x: 8820,
    y: 4860,
    fill: "red",
    height: 70,
    width: 10,
  });
  const road59Welding = new Konva.Rect({
    x: 9640,
    y: 5200,
    fill: roadColour,
    height: 50,
    width: 3894,
    name: "59Welding",
  });
  const pointsRoad59 = new Konva.Rect({
    x: 14108,
    y: 4919,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 663,
  });
  const pointsRoad592 = new Konva.Rect({
    x: 10220,
    y: 4919,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 663,
  });
  const road59 = new Konva.Rect({
    x: 4840,
    y: 5200,
    fill: roadColour,
    height: 50,
    width: 4800,
    name: "59Road",
  });
  const road59A = new Konva.Rect({
    x: 4840,
    y: 5365,
    fill: roadColour,
    height: 50,
    width: 4000,
    name: "59ARoad",
  });
  const road58C = new Konva.Rect({
    x: 4840,
    y: 5035,
    fill: roadColour,
    height: 50,
    width: 3698,
    name: "58CRoad",
  });
  const road58B = new Konva.Rect({
    x: 4840,
    y: 4870,
    fill: roadColour,
    height: 50,
    width: 3408,
    name: "58BRoad",
  });
  const road58A = new Konva.Rect({
    x: 4840,
    y: 4705,
    fill: roadColour,
    height: 50,
    width: 3130,
    name: "58ARoad",
  });
  const road58 = new Konva.Rect({
    x: 4840,
    y: 4540,
    fill: roadColour,
    height: 50,
    width: 2852,
    name: "58Road",
  });
  const pointsRoad59A = new Konva.Rect({
    x: 9128,
    y: 5249,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 333,
  });
  const pointsRoad59A2 = new Konva.Rect({
    x: 8820,
    y: 5249,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 1331,
  });
  const stopRoad58West = new Konva.Rect({
    x: 4840,
    y: 4530,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopRoad58AWest = new Konva.Rect({
    x: 4840,
    y: 4695,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopRoad58BWest = new Konva.Rect({
    x: 4840,
    y: 4860,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopRoad58CWest = new Konva.Rect({
    x: 4840,
    y: 5025,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopRoad59West = new Konva.Rect({
    x: 4840,
    y: 5190,
    fill: "red",
    height: 70,
    width: 10,
  });
  const stopRoad59AWest = new Konva.Rect({
    x: 4840,
    y: 5355,
    fill: "red",
    height: 70,
    width: 10,
  });
  const roadReception = new Konva.Rect({
    x: 100,
    y: 5530,
    fill: roadColour,
    height: 50,
    width: 15134,
    name: "ReceptionRoad",
  });
  const stopRoadReceptionAWest = new Konva.Rect({
    x: 100,
    y: 5520,
    fill: "red",
    height: 70,
    width: 10,
  });
  const pointsRoadReception = new Konva.Rect({
    x: 3533,
    y: 5414,
    rotation: 150,
    fill: roadColour,
    height: 50,
    width: 333,
  });
  const roadNearside = new Konva.Rect({
    x: 4100,
    y: 5695,
    fill: roadColour,
    height: 50,
    width: 10980,
    name: "NearsideRoad",
  });
  const pointsNearside = new Konva.Rect({
    x: 7841,
    y: 5744,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const stopRoadNearside = new Konva.Rect({
    x: 4100,
    y: 5685,
    fill: "red",
    height: 70,
    width: 10,
  });
  const roadFarside = new Konva.Rect({
    x: 8300,
    y: 5860,
    fill: roadColour,
    height: 50,
    width: 6658,
    name: "FarsideRoad",
  });
  const road63 = new Konva.Rect({
    x: 8701,
    y: 6025,
    fill: roadColour,
    height: 50,
    width: 1658,
    name: "63Road",
  });
  const pointsNearside2 = new Konva.Rect({
    x: 8301,
    y: 5909,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const pointsFarside = new Konva.Rect({
    x: 8701,
    y: 6074,
    rotation: -150,
    fill: roadColour,
    height: 50,
    width: 341,
  });
  const stopRoad63East = new Konva.Rect({
    x: 10359,
    y: 6015,
    fill: "red",
    height: 72,
    width: 10,
  });
  const roadMet1 = new Konva.Rect({
    x: 3500,
    y: 5415,
    rotation: -90,
    fill: roadColour,
    height: 50,
    width: 3000,
    name: "Met",
  });
  const roadMet2 = new Konva.Rect({
    x: 3200,
    y: 5415,
    rotation: -90,
    fill: roadColour,
    height: 50,
    width: 3000,
    name: "Met",
  });
  const pointsRoadMet = new Konva.Rect({
    x: 3503,
    y: 5014,
    rotation: 220,
    fill: roadColour,
    height: 50,
    width: 399,
  });
  const pointsRoad322 = new Konva.Rect({
    x: 19577,
    y: 627,
    rotation: 130,
    fill: roadColour,
    height: 50,
    width: 651,
  });
  const pointsRoad323 = new Konva.Rect({
    x: 19577,
    y: 1122,
    rotation: -130,
    fill: roadColour,
    height: 50,
    width: 651,
  });
  const stopRoad32East = new Konva.Rect({
    x: 21020,
    y: 570,
    fill: "red",
    height: 72,
    width: 10,
  });
  const stopRoad35East = new Konva.Rect({
    x: 22270,
    y: 1065,
    fill: "red",
    height: 72,
    width: 10,
  });
  const pointsRoad352 = new Konva.Rect({
    x: 22077,
    y: 297,
    rotation: 130,
    fill: roadColour,
    height: 50,
    width: 1081,
  });
  tracksLayer.add(
    roadEastBound,
    stopEastboundWest,
    stopEastboundEast,
    roadWestBound,
    stopWestboundEast,
    stopWestboundWest,
    westRuislip,
    westRuislipText,
    ruislipGardens,
    ruislipGardensText,
    road23,
    stopRoad23West,
    pointsRoad23,
    pointsWestbound,
    pointsWestbound2,
    pointsRoad232,
    road25,
    stopRoad25West,
    pointsRoad233,
    pointsWestbound3,
    road26,
    wash,
    washText,
    road30,
    stopRoad30East,
    pointsRoad30,
    road27,
    stopRoad27West,
    road31,
    road32,
    road33,
    road34,
    pointsRoad31,
    pointsRoad32,
    pointsRoad33,
    road24,
    pointsRoad26,
    pointsRoad27,
    pointsRoad271,
    pointsRoad272,
    pointsRoad273,
    road35,
    road36,
    road37,
    pointsRoad37,
    pointsRoad35,
    road38,
    road39,
    road40,
    road41,
    road42,
    road43,
    pointsRoad38,
    pointsRoad40,
    pointsRoad274,
    road44,
    road45,
    road46,
    road47,
    road48,
    road49,
    road50,
    road51,
    road52,
    pointsRoad50,
    pointsRoad275,
    pointsRoad276,
    pointsRoad277,
    road53,
    roadA,
    roadB,
    roadB1,
    roadB2,
    roadC,
    roadD,
    roadE,
    roadF,
    roadG,
    roadH,
    roadBank,
    road54,
    stopRoadAWest,
    stopRoadBWest,
    stopRoadB1West,
    stopRoadB2West,
    stopRoadCWest,
    stopRoadDWest,
    stopRoadEWest,
    stopRoadFWest,
    stopRoadGWest,
    stopRoadHWest,
    pointsRoadA,
    pointsRoadB1,
    pointsRoadB2,
    pointsRoadBank,
    pointsRoadE,
    pointsRoadG,
    pointsRoad311,
    pointsEastbound,
    pointsRoad34,
    pointsRoad372,
    pointsRoad302,
    stopRoad39East,
    pointsRoad8,
    pointsRoad402,
    pointsRoad373,
    pointsRoad42,
    pointsRoad43,
    pointsRoad431,
    pointsRoad432,
    stopRoad45East,
    pointsRoad46,
    pointsRoad48,
    pointsRoad502,
    road73,
    road74,
    road75,
    pointsRoad53,
    stopRoad53West,
    road64,
    road65,
    road66,
    road67,
    road68,
    road69,
    road70spur,
    road70,
    pointsRoad69,
    stopRoad64,
    stopRoad65,
    stopRoad66,
    stopRoad67,
    stopRoad68,
    stopRoad69,
    stopRoad70Spur,
    pointsRoad73,
    pointsRoad75,
    pointsRoad74,
    road55,
    pointsRoad55,
    pointsRoad552,
    road57,
    stopRoad57,
    road59,
    road59Welding,
    pointsRoad59,
    pointsRoad592,
    road58,
    road58A,
    road58B,
    road58C,
    road59A,
    pointsRoad59A,
    pointsRoad59A2,
    stopRoad58West,
    stopRoad58AWest,
    stopRoad58BWest,
    stopRoad58CWest,
    stopRoad59West,
    stopRoad59AWest,
    roadReception,
    stopRoadReceptionAWest,
    pointsRoadReception,
    roadNearside,
    pointsNearside,
    pointsNearside2,
    stopRoadNearside,
    roadFarside,
    road63,
    pointsFarside,
    stopRoad63East,
    roadMet1,
    roadMet2,
    pointsRoadMet,
    pointsRoad322,
    pointsRoad323,
    stopRoad32East,
    stopRoad35East,
    pointsRoad352
  );
  tracksLayer.batchDraw();

  const RoadNumberH = new Konva.Text({
    x: 4620,
    y: 2145,
    text: `H Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberG = new Konva.Text({
    x: 4620,
    y: 2310,
    text: `G Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberF = new Konva.Text({
    x: 4620,
    y: 2475,
    text: `F Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberE = new Konva.Text({
    x: 4620,
    y: 2640,
    text: `E Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberD = new Konva.Text({
    x: 5560,
    y: 2805,
    text: `D Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberC = new Konva.Text({
    x: 4620,
    y: 2970,
    text: `C Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberB2 = new Konva.Text({
    x: 4620,
    y: 3135,
    text: `B2 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberB1 = new Konva.Text({
    x: 4620,
    y: 3300,
    text: `B1 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberB = new Konva.Text({
    x: 4620,
    y: 3465,
    text: `B Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberA = new Konva.Text({
    x: 4620,
    y: 3630,
    text: `A Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber58 = new Konva.Text({
    x: 4890,
    y: 4455,
    text: `58 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber58A = new Konva.Text({
    x: 4890,
    y: 4620,
    text: `58A Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber58B = new Konva.Text({
    x: 4890,
    y: 4785,
    text: `58B Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber58C = new Konva.Text({
    x: 4890,
    y: 4950,
    text: `58C Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber59 = new Konva.Text({
    x: 4890,
    y: 5115,
    text: `59 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber59A = new Konva.Text({
    x: 4890,
    y: 5280,
    text: `59A Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberMetSidings = new Konva.Text({
    x: 200,
    y: 5445,
    text: `Met Siding`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberReception = new Konva.Text({
    x: 3600,
    y: 5445,
    text: `RECEPTION Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberReception2 = new Konva.Text({
    x: 14400,
    y: 5445,
    text: `RECEPTION Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberJuiceSidings = new Konva.Text({
    x: 4150,
    y: 5610,
    text: `Juice Siding`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberNearside = new Konva.Text({
    x: 7950,
    y: 5610,
    text: `NEARSIDE`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberNearside2 = new Konva.Text({
    x: 14570,
    y: 5610,
    text: `NEARSIDE`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberFarside = new Konva.Text({
    x: 8350,
    y: 5775,
    text: `FARSIDE`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberFarside2 = new Konva.Text({
    x: 14520,
    y: 5775,
    text: `FARSIDE`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber63 = new Konva.Text({
    x: 8720,
    y: 5940,
    text: `63 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber59Welding = new Konva.Text({
    x: 11090,
    y: 5115,
    text: `59 Welding`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber57Welding = new Konva.Text({
    x: 11090,
    y: 4785,
    text: `57 Welding`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber55 = new Konva.Text({
    x: 9590,
    y: 4455,
    text: `55 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber54 = new Konva.Text({
    x: 8890,
    y: 4290,
    text: `54 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber542 = new Konva.Text({
    x: 15800,
    y: 4290,
    text: `54 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber70Spur = new Konva.Text({
    x: 15740,
    y: 4125,
    text: `70 Spur`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber69 = new Konva.Text({
    x: 13710,
    y: 3960,
    text: `69 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber68 = new Konva.Text({
    x: 13710,
    y: 3795,
    text: `68 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber67 = new Konva.Text({
    x: 13710,
    y: 3630,
    text: `67 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber66 = new Konva.Text({
    x: 13710,
    y: 3465,
    text: `66 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber65 = new Konva.Text({
    x: 13710,
    y: 3300,
    text: `65 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber64 = new Konva.Text({
    x: 13710,
    y: 3135,
    text: `64 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber75 = new Konva.Text({
    x: 14910,
    y: 2970,
    text: `75 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber74 = new Konva.Text({
    x: 14910,
    y: 2805,
    text: `74 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber73 = new Konva.Text({
    x: 14910,
    y: 2640,
    text: `73 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber72 = new Konva.Text({
    x: 14910,
    y: 2475,
    text: `72 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber53 = new Konva.Text({
    x: 11050,
    y: 3960,
    text: `53 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber52 = new Konva.Text({
    x: 9850,
    y: 3795,
    text: `52 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber51 = new Konva.Text({
    x: 9850,
    y: 3630,
    text: `51 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber50 = new Konva.Text({
    x: 9850,
    y: 3465,
    text: `50 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber49 = new Konva.Text({
    x: 9850,
    y: 3300,
    text: `49 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber48 = new Konva.Text({
    x: 9850,
    y: 3135,
    text: `48 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber47 = new Konva.Text({
    x: 9850,
    y: 2970,
    text: `47 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber46 = new Konva.Text({
    x: 9850,
    y: 2805,
    text: `46 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber45 = new Konva.Text({
    x: 9850,
    y: 2640,
    text: `45 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber44 = new Konva.Text({
    x: 9850,
    y: 2475,
    text: `44 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber43 = new Konva.Text({
    x: 9850,
    y: 2310,
    text: `43 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber42 = new Konva.Text({
    x: 9850,
    y: 2145,
    text: `42 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber41 = new Konva.Text({
    x: 9850,
    y: 1980,
    text: `41 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber40 = new Konva.Text({
    x: 9850,
    y: 1815,
    text: `40 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber39 = new Konva.Text({
    x: 9850,
    y: 1650,
    text: `39 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber38 = new Konva.Text({
    x: 9850,
    y: 1485,
    text: `38 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber37 = new Konva.Text({
    x: 9850,
    y: 1320,
    text: `37 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber36 = new Konva.Text({
    x: 9850,
    y: 1155,
    text: `36 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber35 = new Konva.Text({
    x: 9850,
    y: 990,
    text: `35 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber34 = new Konva.Text({
    x: 9850,
    y: 825,
    text: `34 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber33 = new Konva.Text({
    x: 9850,
    y: 660,
    text: `33 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber32 = new Konva.Text({
    x: 9850,
    y: 495,
    text: `32 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber31 = new Konva.Text({
    x: 9850,
    y: 330,
    text: `31 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberMet = new Konva.Text({
    x: 3350,
    y: 4745,
    rotation: -90,
    text: `METROPOLITAN LINE`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumberCentral = new Konva.Text({
    x: 2250,
    y: 165,
    text: `CENTRAL LINE`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber27 = new Konva.Text({
    x: 3380,
    y: 990,
    text: `27 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber30 = new Konva.Text({
    x: 3830,
    y: 825,
    text: `30 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber25 = new Konva.Text({
    x: 1430,
    y: 495,
    text: `25 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber26 = new Konva.Text({
    x: 3430,
    y: 495,
    text: `26 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber23 = new Konva.Text({
    x: 150,
    y: 330,
    text: `23 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber21 = new Konva.Text({
    x: 150,
    y: 0,
    text: `21 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber22 = new Konva.Text({
    x: 150,
    y: 165,
    text: `22 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber262 = new Konva.Text({
    x: 6530,
    y: 645,
    rotation: -330,
    text: `26 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber24 = new Konva.Text({
    x: 6660,
    y: 485,
    rotation: -330,
    text: `24 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber71A = new Konva.Text({
    x: 12850,
    y: 1980,
    text: `71A Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber71B = new Konva.Text({
    x: 12850,
    y: 2310,
    text: `71B Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber71C = new Konva.Text({
    x: 12850,
    y: 2475,
    text: `71C Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber71 = new Konva.Text({
    x: 15850,
    y: 1980,
    text: `71 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber70 = new Konva.Text({
    x: 18320,
    y: 1680,
    rotation: 310,
    text: `70 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber77 = new Konva.Text({
    x: 20050,
    y: 990,
    text: `77 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  const RoadNumber76 = new Konva.Text({
    x: 20050,
    y: 495,
    text: `76 Road`,
    fontSize: 90,
    fontFamily: "Arial",
    fill: "black",
  });
  roadNumbers.add(
    RoadNumberH,
    RoadNumberG,
    RoadNumberF,
    RoadNumberE,
    RoadNumberD,
    RoadNumberC,
    RoadNumberB2,
    RoadNumberB1,
    RoadNumberB,
    RoadNumberA,
    RoadNumber58,
    RoadNumber58A,
    RoadNumber58B,
    RoadNumber58C,
    RoadNumber59,
    RoadNumber59A,
    RoadNumberMetSidings,
    RoadNumberReception,
    RoadNumberReception2,
    RoadNumberJuiceSidings,
    RoadNumberNearside,
    RoadNumberNearside2,
    RoadNumberFarside,
    RoadNumberFarside2,
    RoadNumber63,
    RoadNumber59Welding,
    RoadNumber57Welding,
    RoadNumber55,
    RoadNumber54,
    RoadNumber70Spur,
    RoadNumber69,
    RoadNumber68,
    RoadNumber67,
    RoadNumber66,
    RoadNumber65,
    RoadNumber64,
    RoadNumber75,
    RoadNumber74,
    RoadNumber73,
    RoadNumber72,
    RoadNumber53,
    RoadNumber52,
    RoadNumber51,
    RoadNumber50,
    RoadNumber49,
    RoadNumber48,
    RoadNumber47,
    RoadNumber46,
    RoadNumber45,
    RoadNumber44,
    RoadNumber43,
    RoadNumber42,
    RoadNumber41,
    RoadNumber40,
    RoadNumber39,
    RoadNumber38,
    RoadNumber37,
    RoadNumber36,
    RoadNumber35,
    RoadNumber34,
    RoadNumber33,
    RoadNumber32,
    RoadNumber31,
    RoadNumberMet,
    RoadNumberCentral,
    RoadNumber27,
    RoadNumber30,
    RoadNumber25,
    RoadNumber26,
    RoadNumber23,
    RoadNumber21,
    RoadNumber22,
    RoadNumber262,
    RoadNumber24,
    RoadNumber71A,
    RoadNumber71B,
    RoadNumber71C,
    RoadNumber71,
    RoadNumber70,
    RoadNumber77,
    RoadNumber76,
    RoadNumber542
  );
  roadNumbers.batchDraw();

  //CREATE LOCOS
  function createLocomotive(positionX, positionY, locoName) {
    const loco = new Konva.Group({
      x: positionX,
      y: positionY,
      draggable: true,
      name: locoName,
    });

    loco.setAttr("defaultx", positionX);
    loco.setAttr("defaulty", positionY);

    const rectangle = new Konva.Rect({
      fill: "yellow",
      height: 100,
      width: 200,
      stroke: "blue",
      strokeWidth: 4,
      cornerRadius: 10,
    });

    const line = new Konva.Line({
      points: [25, 0, 25, 100],
      stroke: "blue",
      strokeWidth: 4,
    });

    const line2 = new Konva.Line({
      points: [175, 0, 175, 100],
      stroke: "blue",
      strokeWidth: 4,
    });

    const locoNumberText = new Konva.Text({
      x: 0,
      y: 25,
      text: locoName,
      fontSize: 60,
      fontFamily: "Arial",
      fontStyle: "bold",
      fill: "blue",
      width: 200,
      align: "center",
    });

    loco.add(rectangle, line, line2, locoNumberText);

    return { loco };
  }

  //CREATE RWS
  function createRailWagons(positionX, positionY, wagonName) {
    const rw = new Konva.Group({
      x: positionX,
      y: positionY,
      draggable: true,
      name: wagonName,
    });

    rw.setAttr("defaultx", positionX);
    rw.setAttr("defaulty", positionY);

    const rectangle = new Konva.Rect({
      fill: "orange",
      height: 100,
      width: 200,
      stroke: "blue",
      strokeWidth: 4,
      cornerRadius: 10,
    });

    const wagonNumberText = new Konva.Text({
      x: 0,
      y: 25,
      text: wagonName,
      fontSize: 60,
      fontFamily: "Arial",
      fontStyle: "bold",
      fill: "blue",
      width: 200,
      align: "center",
    });

    rw.add(rectangle, wagonNumberText);

    return { rw };
  }

  //CREATE GPS
  function createGps(positionX, positionY, wagonName) {
    const gp = new Konva.Group({
      x: positionX,
      y: positionY,
      draggable: true,
      name: wagonName,
    });

    gp.setAttr("defaultx", positionX);
    gp.setAttr("defaulty", positionY);

    const rectangle = new Konva.Rect({
      fill: "#EFF59E",
      height: 100,
      width: 200,
      stroke: "blue",
      strokeWidth: 4,
      cornerRadius: 10,
    });

    const wagonNumberText = new Konva.Text({
      x: 0,
      y: 25,
      text: wagonName,
      fontSize: 60,
      fontFamily: "Arial",
      fontStyle: "bold",
      fill: "blue",
      width: 200,
      align: "center",
    });

    gp.add(rectangle, wagonNumberText);

    return { gp };
  }

  for (let i = 1; i <= locos.length; i++) {
    const locoName = locos[i - 1];
    const { loco } = createLocomotive(i * 250 + 500, 7550, locoName);

    layer.add(loco);
  }
  for (let i = 1; i <= rws.length; i++) {
    const rwName = rws[i - 1];
    const { rw } = createRailWagons(i * 250 + 8500, 7550, rwName);

    layer.add(rw);
  }
  for (let i = 1; i <= gps.length; i++) {
    const gpName = gps[i - 1];
    const { gp } = createGps(i * 250 + 500, 7750, gpName);

    layer.add(gp);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //ZOOM
  stage.scaleX(initialScale);
  stage.scaleY(initialScale);
  layer.batchDraw();

  zoomInButton.addEventListener("click", () => {
    const newScale = stage.scaleX() * 1.1;
    if (newScale <= maxScale) {
      stage.scaleX(newScale);
      stage.scaleY(newScale);
      layer.batchDraw();
    }
  });

  zoomOutButton.addEventListener("click", () => {
    const newScale = stage.scaleX() / 1.1;
    if (newScale >= minScale) {
      stage.scaleX(newScale);
      stage.scaleY(newScale);
      layer.batchDraw();
    }
  });

  zoomWholeButton.addEventListener("click", () => {
    stage.x(0), stage.y(0);
    stage.scaleX(minScale);
    stage.scaleY(minScale);
    layer.batchDraw();
  });

  zoomFindButton.addEventListener("click", () => {
    findInput.value = "";
    findModal.classList.toggle("hidden");
    findInput.focus();
  });

  findButton.addEventListener("click", () => {
    findModal.classList.add("hidden");

    let locoNameToFind = findInput.value.toUpperCase();
    let foundLoco = null;

    layer.children.forEach(function (loco) {
      if (loco.getName() === locoNameToFind) {
        foundLoco = loco;
        return false;
      }
    });
    if (foundLoco) {
      let newScale = 0.35;
      let newX = -(foundLoco.x() * newScale - stage.width() / 2);
      let newY = -(foundLoco.y() * newScale - stage.height() / 2);

      stage.scale({ x: newScale, y: newScale });
      stage.position({ x: newX, y: newY });
      layer.batchDraw();
    }
  });

  stage.container().addEventListener("wheel", (e) => {
    e.preventDefault();
    const deltaY = e.deltaY;
    const scaleFactor = deltaY > 0 ? 1.1 : 1 / 1.1;

    const newScaleX = stage.scaleX() * scaleFactor;
    const newScaleY = stage.scaleY() * scaleFactor;

    if (newScaleX >= minScale && newScaleX <= maxScale) {
      stage.scaleX(newScaleX);
      stage.scaleY(newScaleY);
      stage.batchDraw();
    }
  });

  stage.on("touchstart", (e) => {
    let touches = e.evt.touches;

    if (touches.length === 2) {
      initialDistance = getDistance(touches[0], touches[1]);
      initialScale = stage.scaleX();
    }
  });

  stage.on("touchmove", (e) => {
    let touches = e.evt.touches;

    if (touches.length === 2) {
      let currentDistance = getDistance(touches[0], touches[1]);
      let scaleFactor = currentDistance / initialDistance;
      let newScale = initialScale * scaleFactor;

      if (newScale >= minScale && newScale <= maxScale) {
        stage.scale({ x: newScale, y: newScale });
        stage.batchDraw();
      }
    }
  });
  function getDistance(point1, point2) {
    let dx = point2.clientX - point1.clientX;
    let dy = point2.clientY - point1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  //LOCKING
  lockButton.addEventListener("click", () => {
    lockButton.classList.toggle("hidden");
    unlockButton.classList.toggle("hidden");

    layer.children.forEach(function (child) {
      child.draggable(false);
    });
    layer.batchDraw();
  });
  unlockButton.addEventListener("click", () => {
    lockButton.classList.toggle("hidden");
    unlockButton.classList.toggle("hidden");

    layer.children.forEach(function (child) {
      child.draggable(true);
    });
    layer.batchDraw();
  });

  //PANNING
  stage.on("mousedown touchstart", (e) => {
    isDragging = true;
    lastPosition = stage.getPointerPosition();
  });

  stage.on("mousemove touchmove ", (e) => {
    if (!isDragging) return;

    const pointerPosition = stage.getPointerPosition();
    const deltaX = pointerPosition.x - lastPosition.x;
    const deltaY = pointerPosition.y - lastPosition.y;
    stage.x(stage.x() + deltaX);
    stage.y(stage.y() + deltaY);

    lastPosition = pointerPosition;
    layer.batchDraw();
  });

  stage.on("mouseup touchend", () => {
    isDragging = false;
  });

  //WINDOW RESIZING
  window.addEventListener("resize", () => {
    stage.width(window.innerWidth);
    stage.height(window.innerHeight);

    layer.batchDraw();
  });

  // DOUBLE CLICK ZOOM AND PAN
  let doubleClickTimeout = null;
  let doubleClickScale = 1.6;

  stage.on("dblclick", (e) => {
    clearTimeout(doubleClickTimeout);
    let pointerPosition = stage.getPointerPosition();

    let newScale = stage.scaleX() * doubleClickScale;
    let newX =
      pointerPosition.x - (pointerPosition.x - stage.x()) * doubleClickScale;
    let newY =
      pointerPosition.y - (pointerPosition.y - stage.y()) * doubleClickScale;

    if (newScale <= maxScale) {
      stage.scaleX(newScale);
      stage.scaleY(newScale);
      stage.x(newX);
      stage.y(newY);
      layer.batchDraw();
    }
  });

  //ALIGNING WAGONS TO ROADS
  layer.on("dragmove", function (e) {
    layer.children.forEach(function (wagonChecked) {
      let wagon = wagonChecked.getClientRect();

      tracksLayer.children.forEach(function (roadChecked) {
        let road = roadChecked.getClientRect();

        if (haveIntersection(wagon, road)) {
          let position = roadChecked.position();
          let yValue = position.y;
          let xValue = position.x;
          let height = roadChecked.height();
          if (roadChecked.rotation() === 0 && roadChecked.height() === 50) {
            wagonChecked.y(yValue - height / 2);
          }
          if (roadChecked.height() === 70) {
            wagonChecked.x(xValue + 10);
          } else if (roadChecked.height() === 72) {
            wagonChecked.x(xValue - 200);
          }
        }
      });
      layer.batchDraw();
    });
  });

  layer.on("dragend", function (e) {
    const movedWagon = e.target;
    let isOutOfRoad = true;

    tracksLayer.children.forEach(function (road) {
      if (haveIntersection(movedWagon.getClientRect(), road.getClientRect())) {
        isOutOfRoad = false;
        return;
      }
    });

    if (isOutOfRoad) {
      movedWagon.x(movedWagon.getAttr("defaultx"));
      movedWagon.y(movedWagon.getAttr("defaulty"));
    }

    layer.batchDraw();
  });

  function haveIntersection(r1, r2) {
    return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
    );
  }
});
