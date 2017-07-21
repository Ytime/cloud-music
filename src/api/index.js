/**
 * Created by 风稻人 on 2017/7/12.
 */
const url = 'http://musicapi.duapp.com/api.php',
      url2 = 'https://api.imjad.cn/cloudmusic/';
export default {
  getPlayListByWhere (cat, order, offset, total, limit) {
    return url + '?type=topPlayList&cat=' + cat + '&offset=' + offset + '&limit=' + limit;
  },
  getPlayListDetail (id) {
    return url2 + '?type=playlist&id=' + id
  },
  getSong (id) {
    return url + '?type=url&id=' + id
  },
}
