module.exports = {
  getRecords: function(req, res) {    
        var pg = require('pg');  

        var conString = "postgres://postgres:Welcome123@localhost:5432/postgres";
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query("select * from employee");

        query.on("row", function (row, result) { 
            result.addRow(row); 
        });

        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
  },
    

    addRecord : function(req, res){
        var pg = require('pg');  
        
        var conString = "postgres://postgres:Welcome123@localhost:5432/postgres";
        var client = new pg.Client(conString);

        client.connect();
        var query = client.query("insert into employee (firstName,lastName,email,mobile) "+ 
                                "values ('"+req.query.fName+"','"+req.query.lName+"','"+
                                    req.query.email+"','"+req.query.mbl+"')");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });

    },
    
     delRecord : function(req, res){
        var pg = require('pg');   
        
        var conString = "postgres://postgres:Welcome123@localhost:5432/postgres";
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "Delete from employee Where id ="+req.query.id);
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });

    }
    
};