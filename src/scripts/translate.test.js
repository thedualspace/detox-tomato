import {detect, translate} from "./translate";

test("Correctly detects the language of a piece of text", async () => {
    expect( 
        await detect("hello world")
    ).toBe("en");

    expect( 
        await detect("Ciao mondo")
    ).toBe("it");

    expect( 
        await detect("こんにちは世界")
    ).toBe("ja");
})

test("Correctly tanslates a piece of text to the target language", async () => {
    //Using regex as google translate takes its own liberties
    //deciding when to capitalise the returned strings. 
    //eg hello world => Hola Mundo
    expect( 
        await translate("testing the translation", "fr")
    ).toMatch(/tester la traduction/i);

    expect( 
        await translate("testing the translation", "ja")
    ).toMatch(/翻訳のテスト/i);

    expect( 
        await translate("testing the translation", "it")
    ).toMatch(/testare la traduzione/i);

    expect( 
        await translate("testing the translation", "ko")
    ).toMatch(/번역 테스트/i);
})