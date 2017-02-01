package org.dnltsk.timeseries.observations;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.geojson.Feature;
import org.geojson.FeatureCollection;
import org.geojson.Point;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@CrossOrigin
@RestController
public class ObservationHttpService {

  @RequestMapping("/obs")
  public String greeting() throws Exception{
    FeatureCollection featureCollection = createGeoJson();
    return new ObjectMapper().writeValueAsString(featureCollection);
  }

  private FeatureCollection createGeoJson() {
    FeatureCollection fc = new FeatureCollection();
    for (int stationId = 0; stationId < 10_000; stationId++) {
      List<Feature> features = createStationTimeseries(stationId);
      fc.addAll(features);
    }
    return fc;
  }

  private List<Feature> createStationTimeseries(int stationId) {
    List<Feature> timeSlices = new ArrayList<>();
    Point p = new Point(Math.random()*360-180, Math.random()*180-90);
    int lastValidToInMinutes = 0;
    for (int timeBorder = 0; timeBorder < 24; timeBorder++) {
      HashMap<String, Object> properties = new HashMap<>();
      if (timeBorder == 0) {
        properties.put("validFrom", "2017-01-01T00:00:00Z");
      }else {
        int currentValidToInMinutes = lastValidToInMinutes + (int)Math.round(Math.random()*60-30);
        String hours = String.format("%02d", currentValidToInMinutes/60);
        String minutes = String.format("%02d", currentValidToInMinutes%60);
        properties.put("validFrom", "2017-01-01T" + hours + ":" + minutes + ":00Z");
      }
      if(timeBorder==23){
        properties.put("validTo", "2017-01-01T23:59:00Z");
      }else{
        int currentValidToInMinutes = lastValidToInMinutes + 60 + (int)Math.round(Math.random()*60-30);
        String hours = String.format("%02d", currentValidToInMinutes/60);
        String minutes = String.format("%02d", currentValidToInMinutes%60);
        properties.put("validTo", "2017-01-01T" + hours + ":" + minutes + ":00Z");
        lastValidToInMinutes = currentValidToInMinutes;
      }
      properties.put("value", Math.floor(Math.random()*3.99));
      properties.put("stationId", stationId);

      Feature f = new Feature();
      f.setGeometry(p);
      f.setProperties(properties);
      timeSlices.add(f);
    }
    return timeSlices;
  }


}
