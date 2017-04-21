fs = require("fs");
qs = require('querystring');


exports.luu_them_giao_dich = function(jsonString, res) {
    //console.log(jsonString);
    // doi_tuong_giao_dich_luu = JSON.parse(jsonString);
    doi_tuong_giao_dich_luu = qs.parse(jsonString);
    doi_tuong_giao_dich_luu.ngay_giao_dich = (new Date).getTime();
    //console.log(JSON.parse(jsonString));
    console.log(doi_tuong_giao_dich_luu)
    data = fs.readFileSync("./data/ds_giao_dich.json", "utf8");
    ds_giao_dich = JSON.parse(data);
    ds_giao_dich.push(doi_tuong_giao_dich_luu);

    fs.writeFileSync('./data/ds_giao_dich.json', JSON.stringify(ds_giao_dich));

    res.writeHead(200, {"Content-Type": "text/json; charset=utf-8"});
    res.write(JSON.stringify(doi_tuong_giao_dich_luu));
    res.end();
}

exports.edit_ty_gia = function(jsonString, res){
    //ty_gia_luu = JSON.parse(jsonString);
    ty_gia_luu = qs.parse(jsonString);
    data = fs.readFileSync("./data/ty_gia.json", "utf8");

    ds_ty_gia = JSON.parse(data);
    for(i = 0; i < ds_ty_gia.length; i++){
        if(ds_ty_gia[i].loai_tien == ty_gia_luu.loai_tien){
            ds_ty_gia[i] = ty_gia_luu;
        }
    }
    // ds_ty_gia.forEach(function(ty_gia) {
    //     if(ty_gia.loai_tien == ty_gia_luu.loai_tien){
    //         ty_gia = ty_gia_luu;
    //     }
    // });

    fs.writeFileSync('./data/ty_gia.json', JSON.stringify(ds_ty_gia));

    res.writeHead(200, {"Content-Type": "text/json; charset=utf-8"});
    res.write(JSON.stringify(ds_ty_gia));
    res.end();
}

exports.lay_ds_ty_gia = function(res){
    data = fs.readFileSync('./data/ty_gia.json', 'utf8');
    res.writeHead(200, {"Content-Type": "text/json; charset=utf-8"});
    res.write(data);
}

exports.lay_ds_giao_dich = function(res){
    data = fs.readFileSync("./data/ds_giao_dich.json", "utf8");
    res.writeHead(200, {"Content-Type": "text/json; charset=utf-8"});
    res.write(data);
}