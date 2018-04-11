import _admin from '@/service/index';
var _user = {
	checkLogin(resolve,reject){
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/admin_user/checkLogin.php'),
			success : resolve,
			error   : reject
		});
	},
	getAdminName(resolve,reject){
		_admin.request({
			url    : _admin.getServerUrl('/admin_php/admin_user/getAdminName.php'),
			success : resolve,
			error   : reject
		});
	},
	checkAdminLevel(type,resolve,reject){
		_admin.request({
			url    : _admin.getServerUrl("/admin_php/admin_user/checkAdminLevel.php?type="+type),
			success : resolve,
			error   : reject
		});
	},
	getAdminInfo(resolve,reject){
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/admin_user/getAdminInfo.php'),
			success : resolve,
			error   : reject
		});
	},
	addAdmin(adminInfo,resolve,reject){
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/admin_user/addAdmin.php'),
			method  : 'post',
			data    : adminInfo,
			success : resolve,
			error   : reject
		});
	},
	checkAdminName(adminName,resolve,reject){
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/admin_user/checkAdminName.php'),
			method  : 'post',
			data    : {
				adminName : adminName
			},
			success : resolve,
			error   : reject
		});
	},
	deleteAdmin(adminId,resolve,reject){
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/admin_user/deleteAdmin.php'),
			method  : 'post',
			data    : {
				adminId : adminId
			},
			success : resolve,
			error   : reject
		});
	},
	validateLogin(adminInfo,resolve,reject) {
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/admin_user/validateLogin.php'),
			method  : 'post',
			data    : adminInfo,
			success : resolve,
			error   : reject
		});
	},
	logout(resolve,reject){
		_admin.request({
			url     : _admin.getServerUrl('/admin_php/admin_user/logout.php'),
			success : resolve,
			error   : reject
		});
	}
}
export default _user;
