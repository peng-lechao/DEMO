import _admin from '@/service/index';
var _type = {
	getTypeList(resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/type/getTypeList.php'),
			success : resolve,
			error   : reject
		});
	},
	updateTypeItem(typeInfo,resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/type/updateTypeItem.php'),
			method  : 'post',
			data    : typeInfo,
			success : resolve,
			error   : reject
		});
	},
	addTypeItem(typeInfo,resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/type/addTypeItem.php'),
			method  : 'post',
			data    : typeInfo,
			success : resolve,
			error   : reject
		});
	},
	deleteType(id,resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/type/deleteType.php'),
			method  : 'post',
			data    : {
				id  : id
			},
			success : resolve,
			error   : reject
		});
	},	
}

export default _type;