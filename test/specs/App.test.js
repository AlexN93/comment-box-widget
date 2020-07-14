describe('App tests', () => {
    it('should not display any suggestions', () => {
        browser.url('/');
        const input = $('.tags-autocomplete .input-field');
        const dropdown = $('.tags-autocomplete .autocomplete-items');
        input.setValue('test123');
        expect(dropdown.isExisting()).toEqual(false);
    });

    it('should display full list of suggestions', () => {
        browser.url('/');
        const input = $('.tags-autocomplete .input-field');
        const dropdown = $('.tags-autocomplete .autocomplete-items');
        input.setValue('@');
        expect(dropdown.isExisting()).toEqual(true);
        expect(dropdown.$$('.item-row').length).toEqual(200);
    });

    it('should display filtered list of suggestions and selects one', () => {
        browser.url('/');
        const input = $('.tags-autocomplete .input-field');
        const dropdown = $('.tags-autocomplete .autocomplete-items');
        input.setValue('@Pau');
        expect(dropdown.isExisting()).toEqual(true);
        expect(dropdown.$$('.item-row').length).toEqual(3);
        dropdown.$$('.item-row')[0].click();
        expect(input.getHTML()).toEqual('<div class="input-field" contenteditable="true"><a id="tag-0" class="tag" href="#">@Paula Turner&nbsp;<div class="tooltip" contenteditable="false"><div class="tail"></div><img class="tooltip-image" src="https://secure.gravatar.com/avatar/cd4318b7fb1cf64648f59198aca8757f?d=mm"><span class="tooltip-text">&nbsp;Paula Turner</span><span class="tooltip-text">&nbsp;pturner0</span></div></a></div>');
    });
});
