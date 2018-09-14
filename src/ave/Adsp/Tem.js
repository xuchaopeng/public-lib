/**
 * dsp广告样式模板(常用样式)
 * 你也可以根据需要自己定义样式模板
 * ex:  exports const tpl  = (value) = > {return `....`;}
 * 自定义模板使用 {cnt:'..',pcad:'..',tpl:'tpl'}
 */

import Array from '../../pc/Array';

//对联
export const dl = (value) => {
    return `<div class="avedsp-dl avedsp-lf avedsp-common">
        <div class="dl-cnt">
            <a class="dl-img" href="${value.url}" target="_blank" title="${value.topic.split("&&")[0]}"><img src="${value.miniimg[0].src}" data-baiduimageplus-ignore></a>
            <a class="avedsp-icon">广告<i>：${value.source.slice(0, 4)}</i></a>
            <span class="avedsp-hideicon"></span>
        </div>
    </div>`.trim() +
        `<div class="avedsp-dl avedsp-rg avedsp-common">
        <div class="dl-cnt">
            <a class="dl-img" href="${value.url}" target="_blank" title="${value.topic.split("&&")[0]}"><img src="${value.miniimg[1].src}" data-baiduimageplus-ignore></a>
            <a class="avedsp-icon">广告<i>：${value.source.slice(0, 4)}</i></a>
            <span class="avedsp-hideicon"></span>
        </div>
    </div>`.trim()
}

//悬浮广告
export const xf = (value) => {
        const imgsize = String(value.miniimg_size);
        const topicArr = value.topic.split('&&');
        if (imgsize === '4') {
            return `<div class="avedsp-situ avedsp-common">
            <div class="situ-cnt">
				${[0,1,2,3].map((item,index)=>{
					return `<div class="situ-item ${index==1||index==3 ? 'nomar':''}"><div class="situ-img"><a href="${value.url}" target="_blank"><img src="${value.miniimg[index] ? value.miniimg[index].src : value.miniimg[0].src}" alt=""></a></div><a class="situ-text" href="${value.url}" target="_blank">${topicArr[index] ? topicArr[index]:topicArr[0]}</a></div>`.trim();
				}).join('')}
				<a class="avedsp-icon">广告<i>：${value.source.slice(0, 4)}</i></a><span class="avedsp-hideicon"></span>
			</div></div>`.trim();
	}else{
		return `<div class="avedsp-datu avedsp-common">
				<a class="datu-cnt" href="${value.url}" target="_blank" title="${value.topic.split("&&")[0]}">
					<img src="${value.miniimg[0].src}"  width="300" height="250" border="0" data-baiduimageplus-ignore />
				</a>
				<a class="avedsp-icon">广告<i>：${value.source.slice(0, 4)}</i></a>
				<span class="avedsp-hideicon"></span>
			</div>`.trim();
	}
}

//300 * 250
export const th = (value) => {
	const imgsize = String(value.miniimg_size);
	const topicArr = value.topic.split('&&');
	if(imgsize === '4'){
		return `<div class="avedsp-situ avedsp-common"><div class="situ-cnt">
			${[0,1,2,3].map((item,index)=>{
				return `<div class="situ-item ${index==1||index==3 ? 'nomar':''}"><div class="situ-img"><a href="${value.url}" target="_blank"><img src="${value.miniimg[index] ? value.miniimg[index].src : value.miniimg[0].src}" alt=""></a></div><a class="situ-text" href="${value.url}" target="_blank">${topicArr[index] ? topicArr[index]:topicArr[0]}</a></div>`.trim();
			}).join('')}<a class="avedsp-icon">广告<i>：${value.source.slice(0, 4)}</i></a></div></div>`.trim();
	}else{
		return `<div class="avedsp-datu avedsp-common"><a class="datu-cnt" href="${value.url}" target="_blank" title="${value.topic.split("&&")[0]}"><img src="${value.miniimg[0].src}"  width="300" height="250" border="0" data-baiduimageplus-ignore /></a><a class="avedsp-icon">广告<i>：${value.source.slice(0, 4)}</i></a></div>`.trim();
	}
}

//信息流 单图 大图  四图  无图 三图
export const sw = (value) => {
	const imgsize = Number(value.miniimg_size);
	if(Number(value.adtype) === 101){
		return `<div class="avedsp-fwdatu avedsp-common">
			<a class="fwdatu-cnt" href="${value.url}" target="_blank">
				<h3>${value.topic.split('&&')[0]}</h3>
				<p class="fwdatu-img"><img src="${value.miniimg[0].src}" /></p>
				<p class="fwdatu-from">${value.source}<span>广告</span></p>
			</a></div>`.trim();
	}else if(imgsize >= 4){
		return `<div class="avedsp-fwsitu avedsp-common">
			<h3><a href="${value.url}" target="_blank">${value.topic.split('&&')[0]}</a></h3>
			<p class="fwsitu-img">
				${[0,1,2,3].map((item,index)=>{
					return `<a class="${index==3 ? 'nopading':''}" href="${value.url}" target="_blank">
						<img src="${value.miniimg[index] ? value.miniimg[index].src : value.miniimg[0].src}" alt="${value.topic.split('&&')[0]}" /></a>`.trim();
				}).join('')}
			</p>
			<p class="fwsitu-from">
				<a href="${value.url}" target="_blank">${value.source}<span>广告</span></a>
			</p>
		</div>`.trim();
	}else if(imgsize >= 3){
		return `<div class="avedsp-fwsantu avedsp-common">
			<h3><a href="${value.url}">${value.topic.split('&&')[0]}</a></h3>
			<p class="fwsantu-img">
				${[0,1,2,3].map((item,index)=>{
					if(index == 3){
						return `<a class="seemore" href="${value.url}" target="_blank">查看更多</a>`.trim();
					}
					return `<a class="${index==3 ? 'seemore':''}" href="${value.url}" target="_blank">
						<img src="${value.miniimg[index] ? value.miniimg[index].src : value.miniimg[0].src}" alt="${value.topic.split('&&')[0]}" /></a>`.trim();
				}).join('')}
			</p>
			<p class="fwsantu-from"><a href="${value.url}" target="_blank">${value.source}<span>广告</span></a></p></div>`.trim();
	}else{
		return `<a class="avedsp-fwdantu avedsp-common" href="${value.url}" target="_blank" title="${value.topic}" ><div class="fwdantu-img"><img src="${value.miniimg[0].src}" alt="" /></div><div class="fwdantu-text"><h3>${value.topic}</h3><p class="fwdantu-source">${value.source}<span>广告</span></p></div></a>`.trim();
	}
}

//标题下方 正文下方样式模板
export const bx = (value) => {
	const topicArr = value.topic.split('&&');
	const imgArr = value.miniimg;
	return `<div class="avedsp-bxsitu avedsp-common">
				<div class="bxsitu-cnt">
					${[0,1,2,3].map((item,index)=>{
						const img = imgArr[index] ? imgArr[index].src : imgArr[0].src ;
						const topic = topicArr[index] ? topicArr[index] : topicArr[0] ;
						return `<div class="bxsitu-item ${index==3?'noma':''}">
									<div class="bxsitu-img">
										<a href="${value.url}" target="_blank">
											<img src="${img}" alt="" />
										</a>
									</div>
									<span class="bxsitu-pop"></span>
									<a class="bxsitu-text" href="${value.url}" target="_blank">${topic}</a>
								</div>`.trim()
					}).join('')}
					<a class="avedsp-righticon">广告<i>：${value.source.slice(0, 4)}</i></a>
				</div>
			</div>`.trim();
}
