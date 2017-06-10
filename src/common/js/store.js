/*
* @Author: sghuangrihuang
* @Date:   2017-05-22 09:11:30
* @Last Modified by:   sghuangrihuang
* @Last Modified time: 2017-05-24 16:46:38
*/

export function saveToLocal(id, key, value){
    let seller = window.localStorage.__seller__;
    if( !seller ){
        seller = {};
        seller[id]= {};
        seller[id][key] = value;
    } else {
        seller = JSON.parse(seller);
        if( !seller[id] ){
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    window.localStorage.__seller__ = JSON.stringify(seller);
}
export function loadFromLocal(id, key, def=false){
    let seller = window.localStorage.__seller__;
    if( !seller ){
        return def;
    }
    seller = JSON.parse(seller)[id];
    if(!seller){
        return def;
    }
    let ret = seller[key];
    return ret || def;
}