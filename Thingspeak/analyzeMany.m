READ_CHANNEL_ID = 116913;
WRITE_CHANNEL_ID = 175026;
WRITE_API_KEY = [Inset key here];
FIELD_ID = 1;
PIG_MIN=700;


[data, timestamp] = thingSpeakRead(READ_CHANNEL_ID, 'fields', FIELD_ID, 'NumPoints', 2);
if data(1) > PIG_MIN && data(2) <= PIG_MIN

    [data, timestamp] = thingSpeakRead(WRITE_CHANNEL_ID);
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

    [data, timestamp] = thingSpeakRead(READ_CHANNEL_ID, 'fields', FIELD_ID, 'numMinutes', minutesSinceLastPig);
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
        thingSpeakWrite(WRITE_CHANNEL_ID,data_out,'TimeStamp',timestamps_out,'WriteKey',WRITE_API_KEY)
    end;
end;
