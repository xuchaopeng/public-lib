/**
 * 信息流360广告模板
 * ex :  <ul class="newlist">
 * 			<li class="item"></li>
 *       </ul>
 * li.item 即为载入360接口广告的容器（大图、四图、单图）
 */
export	const template1 = (value) => {
	switch(Number(value.type)){
		case 3:
			return `
				<a class="new-datu" href="${value.curl}" target="_blank">
			    	<h3>${value.title}</h3>
			    	<p class="img-wrap clearfix"><img class="scrollLoading" src="${value.img}" alt=""></p>
			    	<p class="from">广告</p>
			    </a>`.trim();break;
		case 2:
			return `
				<div class="new-situ">
	                <h3><a href="${value.curl}" target="_blank">${value.title}</a></h3>
	                <p class="img-wrap clearfix">
	                	${value.assets.map(imglist => `<a class="fl" href="${imglist.curl}" target="_blank" ><img src="${imglist.img}" alt="" ></a>`)}
	                </p>
	                <p class="from"><a href="${value.curl}" target="_blank" >${value.src}<span class="date">广告</span></a></p>
	            </div>`.trim();break;
        case 1:
        	return `
	        	<a class="new-dantu" href="${value.curl}" target="_blank" title="${value.title}">
	                <div class="pic"><img class="scrollLoading" data-url="" src="${value.img}" alt="${value.title}"></div>
	                <div class="text">
	                    <h3>${value.title}</h3>
	                    <p class="from">${value.src}  广告</p>
	                </div>
	            </a>`.trim();break;
        default : break;
	}
}
