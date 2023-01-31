package com.innovature.Library.csv_helper;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import com.innovature.Library.entity.csvUpload;

public class csvHelper {

    csvUpload Csv;
    public static String TYPE = "text/csv";
    static String[] HEADERs = { "books_name", "publications", "books_author", "booksCopies", "categoryId", "status" };

    public static boolean hasCSVFormat(MultipartFile file) {
         if (TYPE.equals(file.getContentType()) || file.getContentType().equals("application/vnd.ms-excel")) {
            return true;
        }
        return false;
    }

    public static List<csvUpload> csvToDb(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                CSVParser csvParser = new CSVParser(fileReader,
                        CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {
            List<csvUpload> csvList = new ArrayList<>();
            Iterable<CSVRecord> csvRecords = csvParser.getRecords();
            for (CSVRecord csvRecord : csvRecords) {
                csvUpload csvob = new csvUpload(
                        csvRecord.get("booksName"),
                        csvRecord.get("publication"),
                        csvRecord.get("booksAuther"),
                        Integer.parseInt(csvRecord.get("booksCopies")),
                        Integer.parseInt(csvRecord.get("categoryId")),
                        Integer.parseInt(csvRecord.get("status"))

                );
                csvList.add(csvob);

            }
            return csvList;

        } catch (IOException e) {
            throw new RuntimeException("fail to parse csv file" + e.getMessage());
        }

    }

}
