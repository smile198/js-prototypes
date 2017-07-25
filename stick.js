$.fn.extend({
	/*
		position: 'start' | 'middle' | 'end' (default 'start'), 
		screen: 'top' | 'center' | 'bottom' (default 'bottom'),
		offset: number (default 0),
		class: string (required),
		replaceClass: [string, string],
		undo: bool (default true),
	*/
	stick: function( attr ) {
		if ( $( document ).find( $( this ) ).length === 0 ) {return;}
		if ( typeof attr.class === 'undefined' ) {
			console.log( '$.stick: Parameter \'class\' is required.' );
			return;
		}

		var o = $( this );
		var t = $( this ).offset().top;
		var h = $( this ).outerHeight( true );
		var w = $( window ).height();
		var s = $( document ).scrollTop();

		attr.offset = ( typeof attr.offset === 'undefined' ) ? 0 : attr.offset;
		attr.class = ( attr.class.substr( 0, 1 ) === '.' ) ? attr.class.substr( 1 ) : attr.class;
		attr.undo = ( typeof attr.undo === 'undefined' ) ? true : attr.undo;
		attr.replaceClass = ( typeof attr.replaceClass === 'undefined' ) ? [] : attr.replaceClass;

		var p;
		if ( attr.position === 'end' ) {
			p = t + h - attr.offset;
		} else if ( attr.position === 'middle' ) {
			p = t + h/2 - attr.offset;
		} else {
			p = t - attr.offset;
		}

		if ( attr.screen === 'top' ) {
			p = p;
		} else if ( attr.screen === 'middle' ) {
			p -= w/2;
		} else {
			p -= w;
		}

		function action( s ) {
			if ( s >= p ) {
				o.addClass( attr.class );
				if ( attr.replaceClass.length === 2 ) {
					o.removeClass( attr.replaceClass[1] );
					o.addClass( attr.replaceClass[0] );
				}
			} else {
				if ( attr.undo ) {
					o.removeClass( attr.class );
				}
				if ( attr.replaceClass.length === 2 ) {
					o.removeClass( attr.replaceClass[0] );
					o.addClass( attr.replaceClass[1] );
				}
			}
		}

		action( s );

		$( document ).on( 'scroll', function() {
			s = $( document ).scrollTop();
			action( s );
		});
	},
});