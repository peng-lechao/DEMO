import _admin from '@/service/index';

var _goods = {
	getAllGoods(resolve,reject){
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/goods/getAllGoods.php'),
			success : resolve,
			error   : reject
		});
	},
	deleteImg(id,resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/goods/deleteImg.php'),
			method  : 'POST',
			data    : {
				id : id
			},
			success : resolve,
			error   : reject
		});
	},
	getImgLists(goods_id,resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/goods/getImgLists.php'),
			method  : 'POST',
			data    : {
				goods_id : goods_id
			},
			success : resolve,
			error   : reject
		});
	},
	deleteGoods(goods_id,resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/goods/deleteGoods.php'),
			method  : 'POST',
			data    : {
				goods_id : goods_id
			},
			success : resolve,
			error   : reject
		});
	},
	updateGoods(formData,resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/goods/updateGoods.php'),
			method  : 'POST',
			data    : formData,
			success : resolve,
			error   : reject
		});
	},
	searchInfo(searchData,resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/goods/searchInfo.php'),
			method  : 'POST',
			data    : searchData,
			success : resolve,
			error   : reject
		});
	},
	addGoods(goodsData,resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/goods/addGoods.php'),
			method  : 'POST',
			data    : goodsData,
			success : resolve,
			error   : reject
		});		
	},
	checkGoodsId(goods_id,resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/goods/checkGoodsId.php'),
			method  : 'POST',
			data    : {
				goods_id : goods_id
			},
			success : resolve,
			error   : reject
		});			
	},
	getUserInfo(resolve,reject){
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/goods/getUserInfo.php'),
			success : resolve,
			error   : reject
		});
	},
	searchUserInfo(searchData,resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/goods/searchUserInfo.php'),
			method  : 'POST',
			data    : searchData,
			success : resolve,
			error   : reject
		});
	}
}
export default _goods;