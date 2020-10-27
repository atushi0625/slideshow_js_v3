'use strict';

{
    const images = [
        'MySlideshow/img/2pac.jpg',
        'MySlideshow/img/2pac01.png',
        'MySlideshow/img/icecube.png',
        'MySlideshow/img/icecube2.png',
        'MySlideshow/img/drdre.jpeg',
        'MySlideshow/img/drdre2.jpeg',
        'MySlideshow/img/icecube2.png',
        
        // 'MySlideshow/img/pic00.png',
        // 'MySlideshow/img/pic01.png',
        // 'MySlideshow/img/pic02.png',
        // 'MySlideshow/img/pic03.png',
        // 'MySlideshow/img/pic06.png',
        // 'MySlideshow/img/pic04.png',
        // 'MySlideshow/img/pic05.png',
        // 'MySlideshow/img/pic07.png',
    ];
    let currentIndex = 0;

    const mainImage = document.getElementById('main');
    mainImage.src = images[currentIndex];

    images.forEach((image, index) =>{
        const img = document.createElement('img');
        img.src = image;

        const li = document.createElement('li');
        if (index === currentIndex) {
          li.classList.add('current');
        }
        li.addEventListener('click', () =>{
            //クリックをしたら次の処理をしてね//
            mainImage.src = image;
            const thumbnails = document.querySelectorAll('.thumbnails>li');
            thumbnails[currentIndex].classList.remove('current');
            currentIndex = index;
            thumbnails[currentIndex].classList.add('current');
            //currentとはCSSの.thumbnails li.currentのこと//
        });

        li.appendChild(img);
        document.querySelector('.thumbnails').appendChild(li);
    });

    const next = document.getElementById('next');
    //HTMLのidのnextを取得//
    next.addEventListener('click', ()=> {
     let target = currentIndex + 1;
     //次のサムネイルなので+1する//
     if (target === images.length) {
         target = 0;
     }
    //  target が更新された時に最後の要素より先にいったら 0 
    //  に差し戻すとしてあげればいいでしょう。
    //  条件としては、target が images の length 、つまりイメージの要素数と同じになったら
    //   0 に差し戻してあげればよいでしょう。
     document.querySelectorAll('.thumbnails>li')[target].click();
    //サムネイルの一覧を取得 とりあえずtarget番目とする//
    });


    const prev = document.getElementById('prev');
    //HTMLのidのnextを取得//
    prev.addEventListener('click', () => {
     let target = currentIndex - 1;
     //次のサムネイルなので+1する//
     if (target < 0) {
         target = images.length - 1;
     }

    //  target を currentIndex + 1 ではなくて、 
    //  currentIndex - 1 にしてあげましょう。
    // target が最初の要素より前にきたら、つまり 0 
    // より小さくなったら最後に飛ばしてあげれば良いでしょう。

     document.querySelectorAll('.thumbnails>li')[target].click();
    //サムネイルの一覧を取得 とりあえずtarget番目とする//
    });

    let timeoutId;


    // 一定時間ごとに画像を次のものに差し替える処理をしたいので、
    // 関数にまとめていきましょう。
    function playSlideshow(){
        //    一定時間繰り返す
        timeoutId = setTimeout(() => {   
            next.click();
          playSlideshow();   //1秒後(1000ミリ秒後)にplaySlideshowを実行
      }, 100);
    //   まずは次の画像にいきたいので、 next 
    //   をクリックしたときと同じ処理をするように 
    //   next.click() としてあげれば OK でしょう。
    }


// isPlaying という変数を用意しておいて、それが
//  true か false かで条件分岐をしていきましょう
    let isPlaying = false;//最初は当然、スライドショーを再生していないので
                            //false としてあげれば OK です。

    const play = document.getElementById('play');
    play.addEventListener('click', () => {
        if (isPlaying === false){
            playSlideshow();
            play.textContent = 'Pause'; 
            // Play ボタンがクリックされたときに isPlaying が 
            // false だったら再生が始まるようにする。
        } else {
            clearTimeout(timeoutId);
            play.textContent = 'play';
        }
        isPlaying = !isPlaying;
    });
}