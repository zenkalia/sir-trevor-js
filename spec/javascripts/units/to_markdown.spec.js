describe("toMarkdown", function(){

  it("converts links to markdown", function(){
    var html = "<a href='http://google.com'>test</a>",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("[test](http://google.com)");
  });

  it("converts links with bolds inside to markdown", function(){
    var html = "<a href='http://google.com'><strong>test</strong></a>",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("[**test**](http://google.com)");
  });

  it("converts links with square brackets correctly", function(){
    var html = "[<a href='http://google.com'>1</a>]",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("\\[[1](http://google.com)\\]");
  });

  it("coverts bold to markdown", function(){
    var html = "<strong>testing</strong>",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("**testing**");
  });

  it("coverts bold tags without closing tags to markdown", function(){
    var html = "<strong>testing</strong><strong>",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("**testing**");
  });

  it("coverts italic to markdown", function(){
    var html = "<em>testing</em>",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("_testing_");
  });

  it("coverts paragraphs to newlines", function(){
    var html = "<p>testing</p>",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("testing\n\n");
  });

  it("coverts br's to newlines", function(){
    var html = "testing<br>",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("testing\n");
  });

  it("removes comments", function(){
    var html = "<!--Yo!-->/* This is a comment */",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("");
  });

  it("removes styles", function(){
    var html = "<style>html { text-align: left; }</style>",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("");
  });

  it("removes scripts", function(){
    var html = "<script>alert('YO!');</script>",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("");
  });

  it("removes font tags, but leaves content", function(){
    var html = "<font>Yolo</font>",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("Yolo");
  });

  it("coverts a complex piece of text correctly", function(){
    var html = "<p><a href=\"#\">Hello</a> this is my <strong>amazing <em>piece</em></strong> <em>I think</em> that <strong>it should</strong> be able to be convereted correctly.</p>",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("[Hello](#) this is my **amazing _piece_** _I think_ that **it should** be able to be convereted correctly.\n\n");
  });

  it("correctly encodes * characters", function(){
    var html = "test*",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("test\\*");
  });

  it("correctly encodes _ characters", function(){
    var html = "test_",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("test\\_");
  });

  it("correctly encodes - characters", function(){
    var html = "test-something",
        markdown = SirTrevor.toMarkdown(html, "Text");

    expect(markdown).toBe("test\\-something");
  });

});