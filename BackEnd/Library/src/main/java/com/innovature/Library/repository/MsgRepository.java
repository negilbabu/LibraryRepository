package com.innovature.Library.repository;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import com.innovature.Library.entity.Msg;

public interface MsgRepository extends Repository<Msg, Integer> {

     Msg save(Msg msg);


  //  Collection<Msg> findBySenderAndReceiver(Integer sender,Integer receiver);

   @Query(value = "select * from msg where sender=?1 and receiver=?2 or sender=?2 and receiver=?1 order by time", nativeQuery = true)
   Collection <Msg> findBySenderAndReceiver(Integer sender,Integer receiver );
    
}
