
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.
var Vehicle = Backbone.Model.extend({
  idAttribute: "registrationNumber",

  urlRoot: "/api/vehicles",

  defaults: {

  },

  start: function() {
    console.log("Vehicle started");
  },

  validate: function(attrs) {
    if (!attrs.registrationNumber) {
      return "Registration number is required for every vehicle";
    }
  }

});

var Vehicles = Backbone.Collection.extend({
  model: Vehicle,
});

var Car = Vehicle.extend({
  start: function(){
    console.log("The car with registration number " + this.get("registrationNumber") + " has started.");
  }
})

var vehicles = new Vehicles([
  new Car ({registrationNumber: "XLI887", color: "Blue"}),
  new Car ({registrationNumber: "ZNP123", color: "Blue"}),
  new Car ({registrationNumber: "XUV456", color: "Gray"})
]);

var blueVehicles = vehicles.where({ color: "Blue"});
console.log("The vehicles that are the color blue ", blueVehicles);

var carXLI887 = vehicles.findWhere({ registrationNumber: "XLI887"});
console.log("the vehicle with the registration Number XLI887", carXLI887);

vehicles.remove(carXLI887);

console.log("the vehicles collection as a JSON object", vehicles.toJSON());

vehicles.each(function(Car) {
  console.log("The car's information", Car);
});

// car.unset("registrationNumber");
//   if(!car.isValid())
//   console.log(car.validationError);
//
// car.set("registrationNumber", "XLI887");
//     if(!car.isValid())
//     console.log(car.validationError);
//
// car.start();
