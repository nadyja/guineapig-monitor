readChannelID = 116913;
readAPIKey = [Inset key here];
wightFieldId = 1;
writeChannelID = 175026;
writeAPIKey = [Inset key here];

PIG_MIN=700;
PIG_SEPARATOR = 1000;


[data, timestamp] = thingSpeakRead(readChannelID, 'fields', wightFieldId, 'NumPoints', 2, 'ReadKey', readAPIKey);
if data(1) > PIG_MIN && data(2) <= PIG_MIN

    [data, timestamp] = thingSpeakRead(writeChannelID);
    now = datetime('now','TimeZone','local');

    d2s = 24*60;    % convert from days to minutes
    d1  = d2s*datenum(timestamp);
    d2  = d2s*datenum(now);
    minutesSinceLastPig = int8(d2-d1);
    display(minutesSinceLastPig);
    [w,h] = size(minutesSinceLastPig)
    if w == 0
        display('hi');
      minutesSinceLastPig = 10000;
    end;
    display(minutesSinceLastPig);

    [data, timestamp] = thingSpeakRead(readChannelID, 'fields', wightFieldId, 'numMinutes', minutesSinceLastPig, 'ReadKey', readAPIKey);
    [length,n] = size(data);



    timestamps_out = [];
    data_out = [];

    stay =[];
    for i = 1:length-1
      if data(i)< PIG_MIN && data(i+1) >= PIG_MIN %% pig will enter
        start = timestamp(i+1);
      elseif  data(i)>= PIG_MIN && data(i+1) >= PIG_MIN %% pig stayed
        stay = [
          stay,
          data(i)
          ];
      elseif  data(i)>= PIG_MIN && data(i+1) < PIG_MIN %% pig will leave
        if size(stay) == [ 0 0 ]
            medianOfStay = data(i);
        else
            medianOfStay = median(stay);
        end;
        stay = [];
        if exist('start','var')
          duration = seconds(timestamp(i) - start);
          data_out = [data_out; duration, medianOfStay];
          timestamps_out= [timestamps_out; timestamp(i)];
        end;
      end;
    end;
    [w,h] = size(data_out);
    display(timestamps_out);
    display(data_out);
    if h > 0
        thingSpeakWrite(writeChannelID,data_out,'TimeStamp',timestamps_out,'WriteKey',writeAPIKey)
    end;
end;
