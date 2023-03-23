song1="";
song2="";
leftWrist_x=0;
rightWrist_x=0;
leftWrist_y=0;
rightWrist_y=0;
scoreLeftWrist = 0;
song2_p="";
scoreRightWrist = 0;
song1_h="";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw()
{
    image (video, 0, 0, 600, 500);
    
    fill('#FF0000');
    stroke('#FF0000');

    song2_p = song2.isPlaying();
    console.log("Peter Pan song ="+song2_p);

    song1_h = song1.isPlaying();
    console.log("Harry Potter song="+ song1_h);

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        song1.stop();
        if(song2_p == false)
        {
            song2.play();
        }
        else
        {
            document.getElementById("song_id").innerHTML = "Song name: Peter Pan Song";
        }
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWrist_x,rightWrist_y,20);
        song2.stop();
        if(song1_h == false)
        {
            song1.play();
        }
        else
        {
            document.getElementById("song_id").innerHTML = "Song name: Harry Potter Theme Song";
        }
    }
}

function modelLoaded()
{
    console.log("PoseNet is Initialized")
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("leftWrist_Score =" +scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("RightWrist_Score =" +scoreRightWrist);

        leftWrist_x = results[0].leftWrist.x;
        leftWrist_y = results[0].leftWrist.y;
        console.log("leftWrist_x =" + leftWrist_x + "leftWrist_y =" + leftWrist_y)

        rightWrist_x = results[0].rightWrist.x;
        rightWrist_y = results[0].rightWrist.y;
        console.log("rightWrist_x =" + rightWrist_x + "rightWrist_y =" + rightWrist_y)
    }
}