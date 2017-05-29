http = require("http");
fs = require("fs");
url = require('url'); // built-in utility

xl_dich_vu = require("./libraries/xl_du_lieu");

server = http.createServer();

server.on("request", function(req, res){
    //console.log("server đang chạy")
    if(req.method == "GET"){
        // url_parts = url.parse(req.url, true);
        // var query = url_parts.query;
        // console.log(query);

        //res.end(req.url);
        if(url.parse(req.url).pathname == "/ty_gia"){
            xl_dich_vu.lay_ds_ty_gia(res);
        }
        else if(url.parse(req.url).pathname == "/ds_giao_dich"){
            xl_dich_vu.lay_ds_giao_dich(res);
        }
        else if(req.url == "/index.html" || req.url == "/"){
            //res.write("false");
            data = fs.readFileSync("./index.html", "utf8");
            res.write(data);
        }
        else if(req.url == "/mh_mua.html"){
            //res.write("false");
            data = fs.readFileSync("./mh_mua.html", "utf8");
            res.write(data);
        }
        else if(req.url == "/cap_nhat_ty_gia.html"){
            //res.write("false");
            data = fs.readFileSync("./cap_nhat_ty_gia.html", "utf8");
            res.write(data);
        }
        else if(req.url == "/thong_ke_giao_dich.html"){
            //res.write("false");
            data = fs.readFileSync("./thong_ke_giao_dich.html", "utf8");
            res.write(data);
        }
        else
        {
            res.write("false");
        }
        
        res.end();
    }
    else if(req.method == "POST"){
        var jsonString = '';

        req.on('data', function (data) {
            jsonString += data;

            if (jsonString.length > 1e6)
                request.connection.destroy();
        });

        if(req.url == "/them_giao_dich"){
            req.on('end', function(){
                xl_dich_vu.luu_them_giao_dich(jsonString, res);
            });
        }
        else if(req.url == "/edit_ty_gia"){
            req.on('end', function(){
                xl_dich_vu.edit_ty_gia(jsonString, res);
            });
        }
        else{
            res.end("false");
        }
    }
})

server.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
});
