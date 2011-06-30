$.getJSON('http://tables.googlelabs.com/api/query?sql=SELECT * FROM 825027&jsonCallback=?', function(tourData) {
	for(var i = 0; i < tourData.table.rows.length; i++) {
		// Populate the home page with tours.
		$('<li/>', {
			'id': 'home-tourItems-' + i
		}).appendTo('#home-tourItems');
		$('#home-tourItems-' + i).html('<a href="#tour-page-' + tourData.table.rows[i][0] + '">' + tourData.table.rows[i][1] + '</a>');
		// Make the skeleton pages for each tour
		$('<div/>', {
			'id': 'tour-page-' + tourData.table.rows[i][0],
			'class': 'page',
			'data-role': 'page',
			'data-url': 'tour-page-' + tourData.table.rows[i][0]
		}).appendTo('body');
		$('<div/>', {
			'id': 'tour-header-' + tourData.table.rows[i][0],
			'class': 'header',
			'data-role': 'header'
		}).appendTo('#tour-page-' + tourData.table.rows[i][0]);
		$('#tour-header-' + tourData.table.rows[i][0]).html('<h2>Locations</h2>');
		$('<div/>', {
			'id': 'tour-content-' + tourData.table.rows[i][0],
			'class': 'content',
			'data-role': 'content'
		}).appendTo('#tour-page-' + tourData.table.rows[i][0]);
		$('<ul/>', {
			'id': 'tour-'  + tourData.table.rows[i][0] + '-locations',
			'class': 'list',
			'data-role': 'listview'
		}).appendTo('#tour-content-' + tourData.table.rows[i][0]);
		// Make the JSON call for this tour's locations
		$.getJSON('http://tables.googlelabs.com/api/query?sql=SELECT * FROM 840293 WHERE fkTour = ' + tourData.table.rows[i][0] + ' ORDER BY pkLocation&jsonCallback=?', function(locData) {
			for(var j = 0; j < locData.table.rows.length; j++) {
				// Add the location to the list for this tour
				$('<li/>', {
					'id': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1]
				}).appendTo('#tour-' + locData.table.rows[j][0] + '-locations');
				$('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1]).html('<a href="#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page">' + locData.table.rows[j][2] + '</a>');
				// Make the page skeleton for this tour location
				$('<div/>', {
					'id': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page',
					'class': 'page',
					'data-role': 'page',
					'data-url': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page'
				}).appendTo('body');
				$('<div/>', {
					'id': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-header',
					'class': 'header',
					'data-role': 'header'
				}).appendTo('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page');
				$('<h3/>', {
					'id': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-header-title',
					'class': 'headerTitle'
				}).appendTo('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-header');
				$('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-header-title').text(locData.table.rows[j][2]);
				$('<a/>', {
					'id': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-header-maplink',
					'class': 'headerLink, ui-btn-right',
					'href': '#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-map',
					'data-icon': 'grid',
					'data-iconpos': 'right',
					'data-transition': 'pop'
				}).appendTo('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-header');
				$('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-header-maplink').text('Map');
				$('<div/>', {
					'id': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-content',
					'class': 'content',
					'data-role': 'content'
				}).appendTo('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page');
				// Put the content on the tour location page skeleton
				if ($.mobile.media("screen and (max-width: 480px)")) {
					$('<img/>', {
						'id': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-content-img',
						'src': locData.table.rows[j][11],
						'alt': locData.table.rows[j][4],
						'width': '100%'
					}).appendTo('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-content');
				} else {
					$('<img/>', {
						'id': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-content-img',
						'src': locData.table.rows[j][3],
						'alt': locData.table.rows[j][4],
						'width': '100%'
					}).appendTo('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-content');
				}
				$('<p/>', {
					'id': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-content-desc'
				}).appendTo('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-content');
				$('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-page-content-desc').text(locData.table.rows[j][5]);
				// Make the map page skeleton for this tour location
				$('<div/>', {
					'id': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-map',
					'class': 'page mappage',
					'data-role': 'page',
					'data-url': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-map'
				}).appendTo('body');
				$('<div/>', {
					'id': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-map-header',
					'class': 'header',
					'data-role': 'header'
				}).appendTo('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-map');
				$('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-map-header').html('<h3>' + locData.table.rows[j][2] + ' Map</h3>');
				$('<div/>', {
					'id': 'tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-map-content',
					'class': 'content map',
					'data-role': 'content'
				}).appendTo('#tour-' + locData.table.rows[j][0] +'-location-' + locData.table.rows[j][1] + '-map');
			}
		});
	}
	// A little odd to call listview() twice. It throws and exception, but it does not work without the double call.
	$('.list').listview('refresh');
	$('.page').page();
	$('.list').listview('refresh');
});