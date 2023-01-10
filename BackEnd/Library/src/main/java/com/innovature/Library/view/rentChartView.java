package com.innovature.Library.view;
import java.util.ArrayList;
import java.util.List;

public class rentChartView {

    private List<String> label=new ArrayList<>();
    private List<String> issueCount=new ArrayList<>();
    private List<String> returnedCount=new ArrayList<>();
    public List<String> getLabel() {
        return label;
    }

    public List<String> getIssueCount() {
        return issueCount;
    }
    public List<String> getReturnedCount() {
        return returnedCount;
    }
    public void setLabel(List<String> label) {
        this.label = label;
    }
    public void setIssueCount(List<String> rentCount) {
        this.issueCount = rentCount;
    }
    public void setReturnedCount(List<String> returnedCount) {
        this.returnedCount = returnedCount;
    }



    
}
