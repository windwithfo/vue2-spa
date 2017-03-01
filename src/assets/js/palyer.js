/**
 * @file 播放处理
 * @author dongkunshan
 */

import {getJSON, md5} from 'common/tool';

let id;
let playList = [];

function init(domId, url) {
    id = domId;
    getJSON('/zx/queryServerVedio.do', {
        serverId: 2
    }).then((json) => {
        console.log(json);
        playList = json.data;
        let sTamp = new Date().getTime();
        let info = md5('2001001' + sTamp + 'B6985AFA-137E-4984-A99A-8A8E910A0FE2');
        let key = info.substring(0, 9) + info.substring(info.length - 10, info.length);
        key = key.toUpperCase();
        if (data.code == 0){
            document.querySelector('#' + id).src='http://pl.koolearn.com/hls/m3u8_free?url=' + playList[0].content_url + '&consumerTypes=2001001&timesTamp=' + sTamp + '&sKey=' + key;
        }
    }, (error) => {
        console.error('出错了', error);
    });
}

function play() {
    document.querySelector('#' + id).play();
}

export default {
    init,
    play
};
