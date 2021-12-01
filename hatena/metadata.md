\<head\>要素にメタデータを追加

```html
<script data-ad-client="ca-pub-7246355771451460" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

<style>
.gist * {
  font-size: 14px !important;
}
/* フッタ非表示 */
.gist-meta {
  display: none;
}
/* コード領域の下枠線調整 */
.gist-file {
  border-bottom: 1px solid !important;
  border-bottom-color: rgb(221, 221, 221) !important;
}
.gist-data {
  border-bottom: none !important;
}
.blob-num {
  display: none;
}
.gist * {
  font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace !important;
}
/* コードエリアの上部の余白を開ける */
.gist tr:first-child td {
  padding-top: 15px !important;
}
/* コードエリアの下部の余白を開ける */
.gist tr:last-child td {
  padding-bottom: 15px !important;
}

.gist .gist-data {
  background-color: rgba(220,220,220,0.2) !important;
}
.gist .highlight {
  background: none !important;
}
</style>
```

# デザイン

## タイトル下
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5CRLSW2"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<!--↓コード行数表示-->
<style>
.prettyprint ol.linenums > li {
	list-style-type: decimal; 
}
</style>
```

## フッタ
```html
<br>
<center>
    <span style="font-size: 80%;">スポンサーリンク</span>

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- マイはてなトップ下 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7246355771451460"
     data-ad-slot="6094667078"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</center>

<link rel="stylesheet"
     href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/atom-one-dark.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>


<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst"></script>
```

## デザインCSS
```css
/* <system section="theme" selected="8599973812270629022"> */
@import url("https://blog.hatena.ne.jp/-/theme/8599973812270629022.css");
/* </system> */




.entry-content p { line-height: 25px; margin: 0.5em, 0 }
.entry-content li { line-height: 25px; margin: 0.5em, 0 }
```