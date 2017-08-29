
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Vehicle = Backbone.Model.extend({

	idAttribute: "registrationNumber",

	urlRoot: "/api/vehicles",

	validate: function(attrs){
		if (!attrs.registrationNumber)
			return "Vehicle is not valid.";
	},

	start: function(){
		console.log("Vehicle started.");
	}
});

var Vehicles = Backbone.Collection.extend({
	model: Vehicle,
});

var Car = Vehicle.extend({
	start: function(){
		console.log("Car with registration number " + this.get("registrationNumber") + " started.");
	}
});

var VehicleView = Backbone.View.extend({
	tagname: "li",

	className: "vehicle",

	events: {
		"click .delete": "onDeleteClick",	 
	},

	render: function() {
		var source = $("#vehicleTemplate").html();
		var template = _.template(source);

		this.$el.html(template(this.model.toJSON()));
		this.$el.attr("data-color", this.model.get("color"));

		return this;
	},

	onDeleteClick: function() {
		this.remove();
	}
});

var VehiclesView = Backbone.View.extend({
	tagname: "ul",

	render: function(){
		this.collection.each(function(vehicle){
			var vehicleView = new VehicleView({model: vehicle});
			this.$el.append(vehicleView.render().$el);
		}, this);

		return this;
	}

})

var vehicles = new Vehicles([
	new Car({ registrationNumber: "XLI887", color: "Blue" }),
	new Car({ registrationNumber: "ZNP123", color: "Blue" }),
	new Car({ registrationNumber: "XUV456", color: "Gray"})

]);

var vehiclesView = new VehiclesView({ collection: vehicles });
$("#container").html(vehiclesView.render().$el);

// var blueVehicles = vehicles.where({ colour: "Blue"});
// console.log("the cars with the color blue ", blueVehicles);


// car.unset("registrationNumber");
//
// if (!car.isValid())
// 	console.log(car.validationError);
//
// car.set("registrationNumber", "XLI887");
//
// if (!car.isValid())
// 	console.log(car.validationError);
//
// car.start();
