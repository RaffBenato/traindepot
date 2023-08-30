document.addEventListener("DOMContentLoaded", function () {
  const zoomInButton = document.getElementById("zoom-in");
  const zoomOutButton = document.getElementById("zoom-out");
  const zoomWholeButton = document.getElementById("zoom-whole");
  const zoomFindButton = document.getElementById("zoom-find");
  const findModal = document.querySelector(".find-modal");
  const findInput = document.querySelector(".find-input");
  const findButton = document.getElementById("find-btn");

  //Zooming variables
  const initialScale = 0.35;
  const minScale = 0.06894334949441323;
  const maxScale = 1.2;
  // Panning variables
  let isDragging = false;
  let lastPosition = { x: 0, y: 0 };
  //Wagons Numbers
  const numberOfLocos = 5;
  //Roads
  const roadColour = "rgb(180,180,180)";

  const stage = new Konva.Stage({
    height: window.innerHeight,
    width: window.innerWidth,
    container: "konva-holder",
  });

  const layer = new Konva.Layer();
  const tracksLayer = new Konva.Layer();
  stage.add(tracksLayer, layer);

  //ROADS
  const roadEastBound = new Konva.Rect({
    x: 100,
    y: 85,
    fill: roadColour,
    height: 50,
    width: 20000,
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
    x: 20100,
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
    width: 20000,
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
    x: 20100,
    y: 240,
    fill: "red",
    height: 72,
    width: 10,
  });
  const westRuislip = new Konva.Rect({
    x: 110,
    y: 135,
    fill: "black",
    height: 114,
    width: 1270,
  });
  const westRuislipText = new Konva.Text({
    x: 120,
    y: 155,
    text: `WEST RUISLIP`,
    fontSize: 90,
    fontFamily: "Calibri",
    fill: "white",
    width: 900,
    align: "center",
  });
  const ruislipGardens = new Konva.Rect({
    x: 18830,
    y: 135,
    fill: "black",
    height: 114,
    width: 1270,
  });
  const ruislipGardensText = new Konva.Text({
    x: 18830,
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
    width: 3500,
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
    width: 3450,
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
    pointsWestbound3
  );
  tracksLayer.batchDraw();

  //CREATE LOCOS
  function createLocomotive(locoNumber, positionX, positionY, locoName) {
    const loco = new Konva.Group({
      x: positionX,
      y: positionY,
      draggable: true,
      name: locoName,
    });

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
      text: `L${locoNumber.toString()}`,
      fontSize: 60,
      fontFamily: "Arial",
      fontStyle: "bold",
      fill: "blue",
      width: 200,
      align: "center",
    });

    const infoText = new Konva.Text({
      x: 100,
      y: 60,
      text: "ATP: YES\n\nTBTC: YES\n\nSERVICE? YES",
      fontSize: 20,
      fontFamily: "Calibri",
      fill: "white",
      width: 200,
      align: "center",
      lineHeight: 0.7,
      visible: false,
    });

    const infoRectangle = new Konva.Rect({
      x: 100,
      y: 50,
      fill: "rgba(100,100,100,0.5",
      height: 100,
      width: 200,
      stroke: "blue",
      strokeWidth: 2,
      cornerRadius: 10,
      visible: false,
    });

    loco.add(rectangle, line, line2, locoNumberText, infoRectangle, infoText);

    return { loco, infoRectangle, infoText };
  }

  for (let i = 1; i <= numberOfLocos; i++) {
    const locoName = `L${i}`;
    const { loco, infoRectangle, infoText } = createLocomotive(
      i,
      i * 220,
      50,
      locoName
    );

    // loco.on("mouseover", function () {
    //   infoRectangle.visible(true);
    //   infoText.visible(true);
    //   layer.batchDraw;
    // });

    // loco.on("mousedown", function () {
    //   infoRectangle.visible(false);
    //   infoText.visible(false);
    //   layer.batchDraw;
    // });

    // loco.on("mouseout", function () {
    //   infoRectangle.visible(false);
    //   infoText.visible(false);
    //   layer.batchDraw;
    // });

    layer.add(loco);
  }

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

  function haveIntersection(r1, r2) {
    return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
    );
  }
});