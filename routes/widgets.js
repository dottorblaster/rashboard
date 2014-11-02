var express = require('express');
var router = express.Router();
var fs = require('fs')

// Get the directories in a specific directory
function getDirectories(dir_path) {
  	return fs.readdirSync(dir_path).filter(function (file) {
    	return fs.statSync(dir_path+file).isDirectory();
  	});
}

/* GET widgets listing. */
router.get('/', function(req, res) {
  	res.send(getDirectories('./widgets/'));
});

// GET widget content
router.get('/:name', function(req, res) {
	var widget_name = req.param('name');

	console.log(widget_name);
	if( !(getDirectories('./widgets/').indexOf(widget_name) > -1) ) {
	  	res.status(404).send('Widget not found');
	  	return;
	}

	var widget = require('./widgets/' + widget_name + '/view');
	widget.content(req, res);
});

module.exports = router;
