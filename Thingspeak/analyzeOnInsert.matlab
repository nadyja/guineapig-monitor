readChannelID = 116913;
readAPIKey = '4PEVSBUMPSOHV6LE';
wightFieldId = 1;
writeChannelID = 175026;
writeAPIKey = '9CBTAPQK06V2ZJG5';

minpig=700;
pigdif = 1000;
sample=60;

[data, timestamp] = thingSpeakRead(readChannelID, 'fields', wightFieldId, 'numPoints', sample, 'ReadKey', readAPIKey);

[length,n] = size(data);



show = 1;
current = data(length);
time = timestamp(length);
previous = data(length-1);
medianOfStay = 0;


if current > pigdif
    writePigField = 2;
else
    writePigField = 3;
end;


if previous <= minpig && current > minpig
    weight = current;
    status = 1;
elseif previous > minpig && current > minpig
    weight = current;
    status = 2;
elseif previous > minpig && current <= minpig
    weight = 0;
    status = 3;
    stay = [];
    for i = length-1:-1:1

       if data(i) <= minpig
            break
        end;
        stay = [
        stay,
        data(i)
        ];

    end
    %display(stay);
    medianOfStay = median(stay);

    if medianOfStay > pigdif
        writePigField = 2;
    else
        writePigField = 3;
    end;
else
    show = 0;
    status = 0;
end;




if status == 1
    thingSpeakWrite(writeChannelID,'Fields',[writePigField],'Values',{-1},'WriteKey',writeAPIKey)
elseif status == 3
    thingSpeakWrite(writeChannelID,'Fields',[writePigField],'Values',{medianOfStay},'WriteKey',writeAPIKey)
end;
