require('./index.css');
var _mall = require('util/mall.js');
var templateCity = require('./city.string');
var templateProvince = require('./province.string');

var provinceCity = {
	city:[
	{
		"name":"北京市","child": [{"name":"东城区"},{"name":"西城区"},{"name":"崇文区"},{"name":"宣武区"},{"name":"朝阳区"},{"name":"丰台区"},{"name":"石景山区"},{"name":"海淀区"},{"name":"门头沟区"},{"name":"房山区"},{"name":"通州区"},{"name":"顺义区"},{"name":"昌平区"},{"name":"大兴区"},{"name":"平谷区"},{"name":"怀柔区"},{"name":"密云县"},{"name":"延庆县"}]
	},
	{
		"name": "上海市", "child": [ {"name":"黄浦区"}, {"name":"卢湾区"}, {"name":"徐汇区"}, {"name":"长宁区"}, {"name":"静安区"}, {"name":"普陀区"}, {"name":"闸北区"}, {"name":"虹口区"}, {"name":"杨浦区"}, {"name":"宝山区"}, {"name":"闵行区"}, {"name":"嘉定区"}, {"name":"松江区"}, {"name":"金山区"}, {"name":"青浦区"}, {"name":"南汇区"}, {"name":"奉贤区"}, {"name":"浦东新区"}, {"name":"崇明县"}] 
	},
	{
		"name":"天津市","child": [{"name":"和平区"},{"name":"河东区"},{"name":"河西区"},{"name":"南开区"},{"name":"河北区"},{"name":"红桥区"},{"name":"塘沽区"},{"name":"汉沽区"},{"name":"大港区"},{"name":"东丽区"},{"name":"西青区"},{"name":"津南区"},{"name":"北辰区"},{"name":"武清区"},{"name":"宝坻区"},{"name":"宁河县"},{"name":"静海县"},{"name":"蓟 县"}]
	},
	{
		"name":"河北省","child": [{"name": "石家庄市"},{"name": "唐山市"},{"name": "秦皇岛市"},{"name": "邯郸市"},{"name": "邢台市"},{"name": "保定市"},{"name": "张家口市"},{"name": "承德市"},{"name": "沧州市"},{"name": "廊坊市"},{"name": "衡水市"}]
	},
	{
		"name": "山西省","child":[{"name": "太原市"},{"name": "大同市"},{"name": "阳泉市"},{"name": "长治市"},{"name": "晋城市"},{"name": "朔州市"},{"name": "忻州市"},{"name": "吕梁市"},{"name": "晋中市"},{"name": "临汾市"},{"name": "运城市"}]
	},
	{
 		"name": "内蒙古自治区","child": [{"name": "呼和浩特市"},{"name": "包头市"},{"name": "乌海市"},{"name": "赤峰市"},{"name": "呼伦贝尔市"},{"name": "兴安盟"},{"name": "通辽"},{"name": "锡林郭勒盟"},{"name": "乌兰察布盟"},{"name": "伊克昭盟"},{"name": "巴彦淖尔盟"},{"name": "阿拉善盟"}]
	},
	{   
		"name": "辽宁省","child": [{"name": "沈阳市"},{"name": "大连市"},{"name": "鞍山市"},{"name": "抚顺市"},{"name": "本溪市"},{"name": "丹东市"},{"name": "锦州市"},{"name": "营口市"},{"name": "阜新市"},{"name": "辽阳市"},{"name": "盘锦市"},{"name": "铁岭市"},{"name": "朝阳市"},{"name": "葫芦岛市"}]
	},
	{ 
		"name": "吉林省", "child": [ { "name": "长春市" }, { "name": "吉林市" }, { "name": "四平市" }, { "name": "辽源市" }, { "name": "通化市" }, { "name": "白山市" }, { "name": "松原市" }, { "name": "白城市" },{ "name": "延边朝鲜族自治州市" } ] 
	},
	{ 
		"name": "黑龙江省", "child": [ { "name": "哈尔滨市" }, { "name": "齐齐哈尔市" }, { "name": "鹤岗市" }, { "name": "双鸭山市" }, { "name": "鸡西市" }, { "name": "大庆市" }, { "name": "伊春市" }, { "name": "牡丹江市" }, { "name": "佳木斯市" }, { "name": "七台河市" }, { "name": "黑河市" }, { "name": "绥化市" }, { "name": "大兴安岭地区" } ] 
	},
	{ 
		"name": "江苏省", "child": [ { "name": "南京市" }, { "name": "苏州市" }, { "name": "无锡市" }, { "name": "常州市" }, { "name": "镇江市" }, { "name": "南通市" }, { "name": "泰州市" }, { "name": "扬州市" }, { "name": "盐城市" }, { "name": "连云港市" }, { "name": "徐州市" }, { "name": "淮安市" }, { "name": "宿迁市" }]
	},
	{ 
		"name": "浙江省", "child": [ { "name": "杭州市" }, { "name": "宁波市" }, { "name": "温州市" }, { "name": "嘉兴市" }, { "name": "湖州市" }, { "name": "绍兴市" }, { "name": "金华市" }, { "name": "衢州市" }, { "name": "舟山市" }, { "name": "台州市" }, { "name": "丽水市" }]
	},
	{ 
		"name": "安徽省", "child": [ { "name": "合肥市" }, { "name": "芜湖市" }, { "name": "蚌埠市" }, { "name": "淮南市" }, { "name": "马鞍山市" }, { "name": "淮北市" }, { "name": "铜陵市" }, { "name": "安庆市" }, { "name": "黄山市" }, { "name": "滁州市" }, { "name": "阜阳市" }, { "name": "宿州市" }, { "name": "巢湖市" }, { "name": "六安市" }, { "name": "亳州市" }, { "name": "池州市" }, { "name": "宣城市" }] 
	},
	{ 
		"name": "福建省", "child": [ { "name": "福州市" }, { "name": "厦门市" }, { "name": "莆田市" }, { "name": "三明市" }, { "name": "泉州市" }, { "name": "漳州市" }, { "name": "南平市" }, { "name": "龙岩市" }, { "name": "宁德市" }, { "name": "其他市" } ] 
	}, 
	{ 
		"name": "江西省", "child": [ { "name": "南昌市" }, { "name": "景德镇市" }, { "name": "萍乡市" }, { "name": "九江市" }, { "name": "新余市" }, { "name": "鹰潭市" }, { "name": "赣州市" }, { "name": "吉安市" }, { "name": "宜春市" }, { "name": "抚州市" }, { "name": "上饶市" }] 
	}, 
	{ 
		"name": "山东省", "child": [ { "name": "济南市" }, { "name": "青岛市" }, { "name": "淄博市" }, { "name": "枣庄市" }, { "name": "东营市" }, { "name": "烟台市" }, { "name": "潍坊市" }, { "name": "济宁市" }, { "name": "泰安市" }, { "name": "威海市" }, { "name": "日照市" }, { "name": "莱芜市" }, { "name": "临沂市" }, { "name": "德州市" }, { "name": "聊城市" }, { "name": "滨州市" }, { "name": "菏泽市" } ] 
	}, 
	{ 
		"name": "河南省", "child": [ { "name": "郑州市" }, { "name": "开封市" }, { "name": "洛阳市" }, { "name": "平顶山市" }, { "name": "安阳市" }, { "name": "鹤壁市" }, { "name": "新乡市" }, { "name": "焦作市" }, { "name": "濮阳市" }, { "name": "许昌市" }, { "name": "漯河市" }, { "name": "三门峡市" }, { "name": "南阳市" }, { "name": "商丘市" }, { "name": "信阳市" }, { "name": "周口市" }, { "name": "驻马店市" }, { "name": "焦作市" }] 
	}, 
	{ 
		"name": "湖北省", "child": [ { "name": "武汉市" }, { "name": "黄石市" }, { "name": "十堰市" }, { "name": "荆州市" }, { "name": "宜昌市" }, { "name": "襄樊市" }, { "name": "鄂州市" }, { "name": "荆门市" }, { "name": "孝感市" }, { "name": "黄冈市" }, { "name": "咸宁市" }, { "name": "随州市" }, { "name": "恩施土家族苗族自治州市" }, { "name": "仙桃市" }, { "name": "天门市" }, { "name": "潜江市" }, { "name": "神农架林区市" }] 
	}, 
	{ 
		"name": "湖南省", "child": [ { "name": "长沙市" }, { "name": "株洲市" }, { "name": "湘潭市" }, { "name": "衡阳市" }, { "name": "邵阳市" }, { "name": "岳阳市" }, { "name": "常德市" }, { "name": "张家界市" }, { "name": "益阳市" }, { "name": "郴州市" }, { "name": "永州市" }, { "name": "怀化市" }, { "name": "娄底市" }, { "name": "湘西土家族苗族自治州市" } ] 
	}, 
	{ 
		"name": "广东省", "child": [ { "name": "广州市" }, { "name": "深圳市" }, { "name": "东莞市" }, { "name": "中山", "child": [ {"value":"中山"} ] }, { "name": "潮州市" }, { "name": "揭阳市" }, { "name": "云浮市" }, { "name": "珠海市" }, { "name": "汕头市" }, { "name": "韶关市" }, { "name": "佛山市" }, { "name": "江门市" }, { "name": "湛江市" }, { "name": "茂名市" }, { "name": "肇庆市" }, { "name": "惠州市" }, { "name": "梅州市" }, { "name": "汕尾市" }, { "name": "河源市" }, { "name": "阳江市" }, { "name": "清远市" } ] 
	},
	{ 
		"name": "广西壮族自治区", "child": [ { "name": "南宁市" }, { "name": "柳州市" }, { "name": "桂林市" }, { "name": "梧州市" }, { "name": "北海市" }, { "name": "防城港市" }, { "name": "钦州市" }, { "name": "贵港市" }, { "name": "玉林市" }, { "name": "百色市" }, { "name": "贺州市" }, { "name": "河池市" }, { "name": "来宾市" }, { "name": "崇左市" }]
	},
	{
		"name": "海南省", "child": [ { "name": "海口市" }, { "name": "三亚市" }, { "name": "五指山" }, { "name": "琼海" }, { "name": "儋州市" }, { "name": "文昌" }, { "name": "万宁" }, { "name": "东方" }, { "name": "澄迈县" }, { "name": "定安县" }, { "name": "屯昌县" }, { "name": "临高县" }, { "name": "白沙黎族自治县" }, { "name": "昌江黎族自治县" }, { "name": "乐东黎族自治县" }, { "name": "陵水黎族自治县" }, { "name": "保亭黎族苗族自治县" }, { "name": "琼中黎族苗族自治县" }] 
	},
	{ 
		"name": "重庆市", "child": [ {"name":"渝中区"}, {"name":"大渡口区"}, {"name":"江北区"}, {"name":"南岸区"}, {"name":"北碚区"}, {"name":"渝北区"}, {"name":"巴南区"}, {"name":"长寿区"}, {"name":"双桥区"}, {"name":"沙坪坝区"}, {"name":"万盛区"}, {"name":"万州区"}, {"name":"涪陵区"}, {"name":"黔江区"}, {"name":"永川区"}, {"name":"合川区"}, {"name":"江津区"}, {"name":"九龙坡区"}, {"name":"南川区"}, {"name":"綦江县"}, {"name":"潼南县"}, {"name":"荣昌县"}, {"name":"璧山县"}, {"name":"大足县"}, {"name":"铜梁县"}, {"name":"梁平县"}, {"name":"开县"}, {"name":"忠县"}, {"name":"城口县"}, {"name":"垫江县"}, {"name":"武隆县"}, {"name":"丰都县"}, {"name":"奉节县"}, {"name":"云阳县"}, {"name":"巫溪县"}, {"name":"巫山县"}, {"name":"石柱土家族自治县"}, {"name":"秀山土家族苗族自治县"}, {"name":"酉阳土家族苗族自治县"}, {"name":"彭水苗族土家族自治县"}] 
	},
	{ 
		"name": "四川省", "child": [ { "name": "成都" }, { "name": "自贡" }, { "name": "攀枝花" }, { "name": "泸州" }, { "name": "德阳" }, { "name": "绵阳" }, { "name": "广元" }, { "name": "遂宁" }, { "name": "内江" }, { "name": "乐山" }, { "name": "南充" }, { "name": "眉山" }, { "name": "宜宾" }, { "name": "广安" }, { "name": "达州" }, { "name": "雅安" }, { "name": "巴中" }, { "name": "资阳" }, { "name": "阿坝藏族羌族自治州" }, { "name": "甘孜藏族自治州" }, { "name": "凉山彝族自治州" }]
	},
	{ 
		"name": "贵州省", "child": [ { "name": "贵阳" }, { "name": "六盘水" }, { "name": "遵义" }, { "name": "安顺" }, { "name": "铜仁地区" }, { "name": "毕节地区" }, { "name": "黔西南布依族苗族自治州" }, { "name": "黔东南苗族侗族自治州" }, { "name": "黔南布依族苗族自治州" } ] 
	}, 
	{ 
		"name": "云南省", "child": [ { "name": "昆明" }, { "name": "曲靖" }, { "name": "玉溪" }, { "name": "保山" }, { "name": "昭通" }, { "name": "丽江" }, { "name": "普洱" }, { "name": "临沧" }, { "name": "德宏傣族景颇族自治州" }, { "name": "怒江傈僳族自治州" }, { "name": "迪庆藏族自治州" }, { "name": "大理白族自治州" }, { "name": "楚雄彝族自治州" }, { "name": "红河哈尼族彝族自治州" }, { "name": "文山壮族苗族自治州" }, { "name": "西双版纳傣族自治州" } ]
	}, 
	{ 
		"name": "西藏藏族自治区", "child": [ { "name": "拉萨" }, { "name": "那曲地区" }, { "name": "昌都地区" }, { "name": "林芝地区" }, { "name": "山南地区" }, { "name": "日喀则地区" }, { "name": "阿里地区" } ]
	}, 
	{ 
		"name": "陕西省", "child": [ { "name": "西安" }, { "name": "铜川" }, { "name": "宝鸡" }, { "name": "咸阳" }, { "name": "渭南" }, { "name": "延安" }, { "name": "汉中" }, { "name": "榆林" }, { "name": "安康" }, { "name": "商洛" } ] 
	}, 
	{ 
		"name": "甘肃省", "child": [ { "name": "兰州" }, { "name": "嘉峪关" }, { "name": "金昌" }, { "name": "白银" }, { "name": "天水" }, { "name": "武威" }, { "name": "酒泉" }, { "name": "张掖" }, { "name": "庆阳" }, { "name": "平凉" }, { "name": "定西" }, { "name": "陇南" }, { "name": "临夏回族自治州" }, { "name": "甘南藏族自治州" } ] 
	},
	{ 
		"name": "青海省", "child": [ { "name": "西宁" }, { "name": "海东地区" }, { "name": "海北藏族自治州" }, { "name": "海南藏族自治州" }, { "name": "黄南藏族自治州" }, { "name": "果洛藏族自治州" }, { "name": "玉树藏族自治州" }, { "name": "海西蒙古族藏族自治州" } ] 
	},
	{ 
		"name": "宁夏回族自治区", "child": [ { "name": "银川" }, { "name": "石嘴山" }, { "name": "吴忠" }, { "name": "固原" }, { "name": "中卫" } ] 
	},
	{ 
		"name": "新疆维吾尔族自治区", "child": [ { "name": "乌鲁木齐" }, { "name": "克拉玛依" }, { "name": "吐鲁番地区" }, { "name": "哈密地区" }, { "name": "和田地区" }, { "name": "阿克苏地区" }, { "name": "喀什地区" }, { "name": "克孜勒苏柯尔克孜自治州" }, { "name": "巴音郭楞蒙古自治州" }, { "name": "昌吉回族自治州" }, { "name": "博尔塔拉蒙古自治州" }, { "name": "石河子" }, { "name": "阿拉尔" }, { "name": "图木舒克" }, { "name": "五家渠" }, { "name": "伊犁哈萨克自治州" } ] 
	},
	],
	init:function(){
		this.loadProvince();
		this.loadCity();
	},
	loadAddress:function(province){
		var _this = this;
		if(province){
			for(var i=0;i<_this.city.length;i++)
				if(province==_this.city[i].name){
					var result = _mall.renderHtml(templateCity,{list:_this.city[i].child})
					$('#city').html(result);
			}
		}
	},
	loadProvince:function(){
		var result = _mall.renderHtml(templateProvince,{list:this.city})
		$('#province').html(result);
	},
	loadCity:function(){
		var _this = this;
		$(document).on('change','#province',function(){
			$('#city').html('<option value="0">请选择市/区</option>');
			for(var i=0;i<_this.city.length;i++)
				if(this.value==_this.city[i].name){
					var result = _mall.renderHtml(templateCity,{list:_this.city[i].child})
					$('#city').html(result);
			}
		})
	}
}

$(function(){
	provinceCity.init();
})

module.exports = provinceCity;