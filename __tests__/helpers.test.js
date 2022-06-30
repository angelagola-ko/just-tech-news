
const {format_date, format_plural, format_url } = require('../utils/helpers');
//test for fromat_date() takes Date() objects and returns 
//MM/DD/YY

test('format_date() returns a date string', () => {
    const date = new Date('2020-03-20 16:12:03');

    expect(format_date(date)).toBe('3/20/2020');
});

test('format_plural() return plural or singular', () => {
    const single=format_plural('banana',1);
    const double=format_plural('banana',2);
    expect(single).toBe('banana');
    expect(double).toBe('bananas');
});

test('format_url() shortens URL string', () => {
    const url1= format_url('http://test.com/page/1');
    const url2= format_url('https://www.aliens.com/sefdsf/');
    const url3= format_url('https://www.google.com?q=goodbye');

    expect(url1).toBe('test.com');
    expect(url2).toBe('aliens.com');
    expect(url3).toBe('google.com');
});