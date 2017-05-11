/* eslint-env browser */
window.styleguide = {
	resizeIframes: function() {
		window.iFrameResize( { heightCalculationMethod: 'documentElementScroll' } );
	},
	injectIframeResizer: function() {
		var iframes = document.querySelectorAll( 'iframe' );
		iframes.forEach( function( iframe ) {
			iframe.contentWindow.eval(
				'function createScript() {' +
				'	var script = document.createElement("script");' +
				'	script.src = "/static/iframeResizer.contentWindow.min.js";' +
				'	document.body.appendChild(script);' +
				'}' +
				'setTimeout(createScript, 600);'
			);
		} );
	},
	showTab: function( tabEl, id ) {
		var context = tabEl.parentElement.parentElement;
		var tabs = context.querySelectorAll( '[data-tab-toggle]' );
		var tabContents = context.querySelectorAll( '[data-tab-id]' );

		tabs = Array.prototype.slice.call( tabs, 0 );
		tabContents = Array.prototype.slice.call( tabContents, 0 );

		tabs.forEach( function( t ) {
			t.classList.remove( 'active' );
		} );

		tabEl.classList.add( 'active' );

		tabContents.forEach( function( t ) {
			if ( t.getAttribute( 'data-tab-id' ) === id ) {
				t.classList.add( 'active' );
			} else {
				t.classList.remove( 'active' );
			}
		} );
	}
};

window.styleguide.injectIframeResizer();
window.styleguide.resizeIframes();
