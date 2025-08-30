(function($) {
    'use strict';
    $('body').on('click', '.interox-login-form-ajax button[type="submit"]', (event) => {
        var $this = $(event.currentTarget);
        var $form = $this.closest('form');
        $.ajax({
            type: 'POST',
            url: interoxAjax.ajaxurl,
            data: $form.serialize() + '&nonce=' + interoxAjax.nonce,
            beforeSend: () => {
                $form.addClass('loading');
                $form.find('input,button').prop('disabled', true);
            },
            success: (response) => {
                if (response.status) {
                    $form.find('.result-error').remove();
                    location.reload();
                } else {
                    if ($form.find('.result-error').length <= 0) {
                        $form.prepend(`<div class="result-error woocommerce-message woocommerce-error">${response.msg}</div>`);
                    }
                }
            },
            complete: function() {
                $form.find('input,button').prop('disabled', false);
                $form.removeClass('loading');
            }
        });

        return false;
    });
})(jQuery);