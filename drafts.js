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

// zoomFindButton.addEventListener("click", () => {
//   findInput.value = "";
//   findModal.classList.toggle("hidden");
//   findInput.focus();
// });

// findButton.addEventListener("click", () => {
//   findModal.classList.add("hidden");

//   let locoNameToFind = findInput.value.toUpperCase();
//   let foundLoco = null;

//   //Looks for locos not coupled
//   layer.children.forEach(function (loco) {
//     if (loco.getName() === locoNameToFind) {
//       foundLoco = loco;
//       return false;
//     }
//   });

//   //Uncouples all rakes
//   rakesInLayer = [];

//   layer.children.forEach(function (loco) {
//     if (loco.getName() === "rake") {
//       let rakeToAdd = {
//         rake: loco,
//         rakeX: loco.x(),
//         rakeY: loco.y(),
//         wagons: [],
//       };
//       rakesInLayer.push(rakeToAdd);
//     }
//   });

//   rakesInLayer.forEach(function (loco) {
//     loco.rake.children.forEach(function (wagon) {
//       if (wagon.getAttr("stroke", "darkblue")) {
//         return;
//       } else {
//         if (wagon.getName() === "rake") {
//           breakRakes(wagon, loco.wagons);
//         } else {
//           loco.wagons.push(wagon);
//         }
//       }
//     });
//   });

//   function breakRakes(rake, array) {
//     rake.children.forEach(function (wagon) {
//       if (wagon.getAttr("stroke", "darkblue")) {
//         return;
//       } else {
//         if (wagon.getName() === "rake") {
//           breakRakes(wagon, array);
//         } else {
//           array.push(wagon);
//         }
//       }
//     });
//   }

//   rakesInLayer.forEach(function (loco) {
//     uncoupleOffsetX = 0;
//     rakeX = loco.rake.x();
//     rakeY = loco.rake.y();
//     handleUncouple(loco.rake);
//   });

//   //finds wagon
//   let foundInRake = false;
//   let foundInRakeX;
//   let foundInRakeY;

//   rakesInLayer.forEach(function (loco) {
//     loco.wagons.forEach(function (wagon) {
//       if (wagon.getName() === locoNameToFind) {
//         foundInRake = true;
//         foundInRakeX = wagon.x();
//         foundInRakeY = wagon.y();
//       } else {
//         layer.children.forEach(function (loco) {
//           if (loco.getName() === locoNameToFind) {
//             foundLoco = loco;
//             return false;
//           }
//         });
//       }
//     });
//   });

//   //Couples all rakes
//   rakesInLayer.forEach(function (loco) {
//     const rake = new Konva.Group({
//       x: loco.rakeX,
//       y: loco.rakeY,
//       width: loco.wagons.length * 200,
//       draggable: true,
//       name: "rake",
//     });

//     handleSelection(rake);

//     let wagonPosition = 0;
//     loco.wagons.forEach(function (wagon) {
//       wagon.remove();
//       wagon.draggable(false);

//       rake.add(wagon);
//       wagon.moveToBottom();

//       wagon.position({ x: wagonPosition, y: 0 });
//       wagonPosition = wagonPosition + 200;
//     });

//     rake.on("click tap", function () {
//       handleSelection(rake);
//     });

//     layer.add(rake);
//     layer.batchDraw();
//   });

//   //Zooms in on the wagon
//   if (foundLoco) {
//     let newScale = 0.35;
//     let newX;
//     let newY;

//     if (foundInRake) {
//       newX = -(foundInRakeX * newScale - stage.width() / 2);
//       newY = -(foundInRakeY * newScale - stage.height() / 2);
//     } else {
//       newX = -(foundLoco.x() * newScale - stage.width() / 2);
//       newY = -(foundLoco.y() * newScale - stage.height() / 2);
//     }

//     stage.scale({ x: newScale, y: newScale });
//     stage.position({ x: newX, y: newY });
//     layer.batchDraw();
//   }
// });
