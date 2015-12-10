/**
 * Created by m on 10/20/15.
 */

var ReplicateHtmlElement = {
    config: {
        handlerSelector: '.replicate-html-element'
    },

    init: function (config) {
        $.extend(this.config, config);
        return this.bindEvents();
    },

    bindEvents: function () {
        var self = this;

        $(document).on('click', self.config.handlerSelector, function (e) {

            var sourceSelector = $($(this).attr('data-source'));

            sourceSelector.find('.header-index').removeClass('hidden');

            var source = sourceSelector.last().clone(),
                destination = $($(this).attr('data-destination')),
                exceptElement = $(this).attr('data-except'),
                insertionMode = $(this).attr('data-insertion-mode'),
                clearData = $(this).attr('data-clear-data'),
                headerIndex = insertionMode != 'prepend' ? destination.find('.header-index').last().text() : destination.find('.header-index').first().text();


            /*
             * if you want to prevent an element to be copied from source to destination then
             * set the selector of that element to data-except
             */
            if ((typeof exceptElement !== 'undefined')) {
                source.find(exceptElement).remove();
            }

            /*
             * if clearData=false, then duplicate the source with filled data.
             * Otherwise clear all input text and selected value set to the first option
             */
            if (clearData != 'false') {
                source.find('select').each(function () {
                    $(this).find('option:first').prop('selected', 'selected');
                });
                source.find('input[type="text"]').val('');
            }

            if ((typeof headerIndex !== 'undefined')) {
                headerIndex = parseInt(headerIndex) + 1;
                source.find('.header-index').last().text(headerIndex);

            }

            insertionMode = (typeof insertionMode === 'undefined') ? 'append' : insertionMode;
            destination[insertionMode](source);

            e.preventDefault();

        });

        $(document).on('click', '.remove', function () {
            var selector = $(this).attr('data-dismiss');

            $(this).closest(selector).remove();

        });
    }
}

ReplicateHtmlElement.init();
