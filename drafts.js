//COLLISION DETECTION
let isTouching = false;

layer.on("dragmove", function (e) {
  let target = e.target;
  let targetRect = e.target.getClientRect();
  layer.children.forEach(function (group) {
    // do not check intersection with itself
    if (group === target) {
      return;
    }
    if (haveIntersection(group.getClientRect(), targetRect)) {
      isTouching = true;
      console.log(isTouching);
    } else {
      isTouching = false;
      console.log(isTouching);
    }
    layer.batchDraw();
  });
});

layer.on("dragend", function (e) {
  let target = e.target;

  if (isTouching) {
    console.log("its touching");
    target.position({ x: 50, y: 50 });
  }
});

function haveIntersection(r1, r2) {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}

//COLLISION DETECTION
layer.on("dragmove", function (e) {
  let target = e.target;
  let targetRect = e.target.getClientRect();
  layer.children.forEach(function (group) {
    if (group === target) {
      return;
    }
    if (haveIntersection(group.getClientRect(), targetRect)) {
      const newX = group.x() + group.width() - 210;
      const newY = group.y();

      target.position({ x: newX, y: newY });
    }
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

/* 
20=200
2000=20000
Distance between roads: 165

*/

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

// loco.on("click tap", function () {
//   rectangle.stroke("red");
//   rectangle.strokeWidth(20);
//   layer.batchDraw;
// });

/////////////////////////////////////TO DO//////////////////////

// Fix find loco bug when in a rake
