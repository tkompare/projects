function getPersons()
{
	/*
	 * Make the JSON call to the php file and get a list of Persons.
	 */
	$.getJSON('getPersons.php', function(Persons)
	{
		/*
		 * For each Person, add them to the main list and create a JQM page.
		 */
		$.each(Persons, function(i,Person)
		{
			/* 
			 * Add each person to the main list and make it a link
			 * to the JQM page for that person.
			 */
			$('<li/>', {
				'id': 'main-content-list-item-'+Person['id']
			}).appendTo('#main-content-list');
			$('#main-content-list-item-'+Person['id']).html('<a href="#person-'+Person['id']+'-page">'+Person['firstName']+' '+Person['lastName']+'</a>');
			/*
			 * Create the person JQM page.
			 */
			// page
			$('<div/>', {
				'id': 'person-'+Person['id']+'-page',
				'class':'person-page',
				'data-role':'page',
				'data-url':'person-'+Person['id']+'-page'
			}).appendTo('body');
			// content
			$('<div/>', {
				'id': 'person-'+Person['id']+'-page-content',
				'class':'person-page-content',
				'data-role':'content'
			}).appendTo('#person-'+Person['id']+'-page');
			// unordered list
			$('<ul/>', {
				'id': 'person-'+Person['id']+'-page-content-list',
				'class':'list',
				'data-role':'listview'
			}).appendTo('#person-'+Person['id']+'-page-content');
			// first name list item
			$('<li/>', {
				'id': 'person-'+Person['id']+'-page-content-list-firstname',
				'class':'person-page-content-list-firstname'
			}).appendTo('#person-'+Person['id']+'-page-content-list');
			$('#person-'+Person['id']+'-page-content-list-firstname').html('<h3>'+Person['firstName']+'</h3><p>First Name</p>');
			// last name list item
			$('<li/>', {
				'id': 'person-'+Person['id']+'-page-content-list-lastname',
				'class':'person-page-content-list-lastname'
			}).appendTo('#person-'+Person['id']+'-page-content-list');
			$('#person-'+Person['id']+'-page-content-list-lastname').html('<h3>'+Person['lastName']+'</h3><p>Last Name</p>');
			// email list item
			$('<li/>', {
				'id': 'person-'+Person['id']+'-page-content-list-email',
				'class':'person-page-content-list-email'
			}).appendTo('#person-'+Person['id']+'-page-content-list');
			$('#person-'+Person['id']+'-page-content-list-email').html('<h3>'+Person['email']+'</h3><p>Email Address</p>');
		});
		/*
		 * Let JQM know any DIV class="person-page" we just added
		 * is a JQM page and that it should treat it as such.
		 */
		$('.person-page').page();
		/*
		 * Since we added things to lists, refresh the lists.
		 */
		$('.list').listview('refresh');
	});
}