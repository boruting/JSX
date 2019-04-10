'use strict';
var fs = require("fs-extra");
var crypto = require('crypto');
var path = require("path");
require("buffer");
var spawnSync = require('child_process').spawnSync;

//exe·��
const EXE_PATH = "D:/junyou2016/huancheng/ui/exe";

build();

function build() {
    var avgs = process.argv;

    var pIn = avgs[2];
    var dirList = fs.readdirSync(pIn);
    dirList.forEach(function (item) {
        let result = /\d+/.exec(item);
        let num;
        if (result) {
            num = result[0];
            item = pIn + item;
            if (fs.statSync(item).isDirectory()) {
                let inDir = item + "\\" + avgs[4];
                //console.log(inDir);
                if (fs.existsSync(inDir)) {
                    solve(inDir, avgs[3] + "/" + num + "/");
                }
            }
        }
    });
}


function solve(inDir, outDir) {
    //console.log(inDir, outDir);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }
    var list = [];
    walkDirSync(inDir, list);
    for (let file of list) {
        //console.log(file);
        let info = path.parse(file);
        if (info.ext == ".png") {
            let outname = getButtonName(info.name);
            pngQuant(file, outDir + outname + ".png");
        }
        
    }
}

/**
 * ͬ�������ļ��У����ļ�·���������飬Ĭ�ϲ�����.svn�ļ��к�thumbs.db
 * @param {string} path
 * @return {Array} �ļ��б�
 */
function walkDirSync(path, fileList, excludeReg) {
    var dirList = fs.readdirSync(path);
    dirList.forEach(function (item) {
        var lowerItem = item.toLowerCase();
        if (lowerItem != ".svn" && lowerItem != "thumbs.db") {
            var tpath = path + '/' + item;
            if (!excludeReg || tpath.search(excludeReg) == -1) {
                if (fs.statSync(tpath).isDirectory()) {
                    walkDirSync(tpath, fileList, excludeReg);
                } else {
                    fileList.push(tpath);
                }
            }
        }
    });
}


/**
 * ��ȡ��ť����
 * @param {string} name �ļ���
 * @returns {string} ����õ��ļ���
 */
function getButtonName(name) {
    return md5(name).substring(0, 10).toLowerCase();
}

/**
 * ���ڴ����ַ��������ļ���md5
 * @param {string}|{Buffer} �����������
 * @return {string} md5�ַ���
 */
function md5(data) {
    if (typeof data === "string") {
        data = new Buffer(data);
    }
    if (!Buffer.isBuffer(data)) {
        throw new Error("ֻ�ܽ����ַ�������Buffer����");
    }
    return crypto.createHash('md5').update(data).digest('hex');
}

/**
 * ʹ��pngQuant����ͼƬ
 * @param {string} pathIn   Ҫ�����ͼƬ
 * @param {string} pathOut  ����õ�ͼƬ
 */
function pngQuant(pathIn, pathOut) {
    console.log(pathIn, pathOut);
    var args = [];
    args[0] = "-f";
    args[1] = "--ext";
    args[2] = ".png";
    args[3] = "-";
    args[4] = "--skip-if-larger";
    var fd = fs.readFileSync(pathIn);
    var child = spawnSync("pngquant", args, { input: fd, cwd: EXE_PATH });
    var out = child.stdout;
    out = out.length ? out : fd;
    fs.writeFileSync(pathOut, out);
}