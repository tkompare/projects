function getPersons()
{
	$.getJSON('getPersons.php', function(Persons)
	{
		$.each(Persons, function(i,Person)
		{
			/* 
			 * Add each person to the main list and make it a link
			 * make it a line to another JQM page.
			 */
			$('<li/>', {
				'id': 'main-content-list-item-'+Person['id']
			}).appendTo('#main-content-list');
			$('#main-content-list-item-'+Person['id']).html('<a href="#person-'+Person['id']+'-page">'+Person['firstName']+' '+Person['lastName']+'</a>');
			/*
			 * Create the person pages
			 */
			$('<div/>', {
				'id': 'person-'+Person['id']+'-page',
				'class':'person-page',
				'data-role':'page',
				'data-url':'person-'+Person['id']+'-page'
			}).appendTo('body');
			$('<div/>', {
				'id': 'person-'+Person['id']+'-page-content',
				'class':'person-page-content',
				'data-role':'content'
			}).appendTo('#person-'+Person['id']+'-page');
			$('<ul/>', {
				'id': 'person-'+Person['id']+'-page-content-list',
				'class':'list',
				'data-role':'listview'
			}).appendTo('#person-'+Person['id']+'-page-content');
			$('<li/>', {
				'id': 'person-'+Person['id']+'-page-content-list-firstname',
				'class':'person-page-content-list-firstname'
			}).appendTo('#person-'+Person['id']+'-page-content-list');
			$('#person-'+Person['id']+'-page-content-list-firstname').html('<h3>'+Person['firstName']+'</h3><p>First Name</p>');
			$('<li/>', {
				'id': 'person-'+Person['id']+'-page-content-list-lastname',
				'class':'person-page-content-list-lastname'
			}).appendTo('#person-'+Person['id']+'-page-content-list');
			$('#person-'+Person['id']+'-page-content-list-lastname').html('<h3>'+Person['lastName']+'</h3><p>Last Name</p>');
			$('<li/>', {
				'id': 'person-'+Person['id']+'-page-content-list-email',
				'class':'person-page-content-list-email'
			}).appendTo('#person-'+Person['id']+'-page-content-list');
			$('#person-'+Person['id']+'-page-content-list-email').html('<h3>'+Person['email']+'</h3><p>Email Address</p>');
		});
		$('.person-page').page();
		$('.list').listview('refresh');
	});
}